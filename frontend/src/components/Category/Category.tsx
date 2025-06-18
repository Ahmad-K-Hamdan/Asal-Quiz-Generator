import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  Card,
  Divider,
} from "@fluentui/react-components";
import { Delete20Regular, DocumentAdd20Regular, Eye20Regular, Play20Regular, Play24Regular } from "@fluentui/react-icons";
import { ButtonsContainer, Container, DeleteButton, FormGroup, HiddenInput, PageWrapper, QuizActions, StyledButton, StyledTable } from "./Category.styles";
import { GetDocumentsByCategory } from "../../APIs/Documents/GetDocumentsByCategory";
import { DeleteDocument } from "../../APIs/Documents/DeleteDocument";
import { UploadDocuments } from "../../APIs/Documents/UploadDocuments";
import { Spinner, SpinnerSize } from "@fluentui/react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import LoadingDialog from "./LoadingDialog";
import GenerateQuizDialog from "./GenerateQuizDialog";
import { GetCategoryById } from "../../APIs/Categories/GetCategoryById";
import { GenerateQuiz } from "../../APIs/Quizes/GenerateQuiz";
import { QuizQuestion } from "../QuizGenerator/data/quiz";


export type Document = {
  id: number;
  name: string;
  path: string;
  category_id: number;
};



const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate()
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = React.useState(false);
  const [isGeneratedQuiz, setIsGeneratedQuiz] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [loadingDialog, setLoadingDialog] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<number | null>(null);
  const [categoryName, setCategoryName] = React.useState("");
  const [isOpenGenerateDialog, setIsOpenGenerateDialog] = React.useState(false);
  const [quizName, setQuizName] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("easy");
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [indexName, setIndexName] = React.useState("");
  React.useEffect(() => {
    if (!id) return;
    GetCategoryById(parseInt(id), setCategoryName)
    GetDocumentsByCategory(parseInt(id), setDocuments)
      .finally(() => {
        setLoading(false);
      })
  }, [id]);
  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  async function handleAddDocument(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if(file){
    setLoadingDialog(true);
    await UploadDocuments(parseInt(id as string), file).finally(() => {
      setLoadingDialog(false);
    });
    setLoading(true);
    await GetDocumentsByCategory(parseInt(id as string), setDocuments).finally(() => {
      setLoading(false);
    });
  }
  }
  function handleOpenGenerateQuizDialog() {
    setIsOpenGenerateDialog(true);
  }
  async function handleGenerateQuiz() {
    setIsOpenGenerateDialog(false);
    setIsGeneratingQuiz(true);
    // Simulate API call to generate quiz
    await GenerateQuiz(parseInt(id as string), quizName, difficulty, setQuestions, setIndexName)
      .then(() => {
        setIsGeneratingQuiz(false);
        setIsGeneratedQuiz(true);
      })
  }
  function handleOpenConfirmDelete(documentId: number) {
    setConfirmDelete(true);
    setSelectedDocumentId(documentId);
  }
  async function handleDeleteDocument(documentId: number) {
    setConfirmDelete(false);
    setLoadingDialog(true);
    await DeleteDocument(documentId)
      .finally(() => {
        setLoadingDialog(false);
      })
    setLoading(true);
    await GetDocumentsByCategory(parseInt(id as string), setDocuments).finally(() => {
      setLoading(false);
    });
  }

  //this will changed later
  if (!categoryName) return <Text>Loading category...</Text>;

  return (
    <PageWrapper>
      {isGeneratingQuiz || isGeneratedQuiz ? (
        <Container>
          <Card>
            <Text size={700} weight="bold">{categoryName}</Text>
            <Text size={400}>Documents ({documents.length} / {3})</Text>
          </Card>

          <Card>
            <Text size={500} weight="semibold">
              {isGeneratingQuiz ? "Generating your quiz..." : "The quiz is ready!"}
            </Text>
            {isGeneratedQuiz && (
              <ButtonsContainer>
                <Button appearance="primary" onClick={() => navigate(`/categories/${id}/view-quiz`,
                  {
                    state: {
                      questions: questions,
                      quizName: quizName,
                      difficulty: difficulty,
                      indexName: indexName
                    }
                  }
                )}>
                  View Quiz
                </Button>
              </ButtonsContainer>
            )}
          </Card>
        </Container>
      ) :
        <Container>
          <Card>
            <Text size={700} weight="bold">{categoryName}</Text>
            <Text size={400}>Documents ({documents.length} / {3})</Text>
          </Card>

          <Card style={{ borderRadius: '10px', padding: '24px' }}>
            <Text size={500} weight="semibold">Documents</Text>
            <StyledTable>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>#</TableHeaderCell>
                  <TableHeaderCell>Document Name</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ?
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Spinner style={{ padding: '10px' }} label="Loading documents..." size={SpinnerSize.medium} />
                    </TableCell>
                  </TableRow>
                  : documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Text>No documents added yet.</Text>
                      </TableCell>
                    </TableRow>
                  ) : (
                    documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.id}</TableCell>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>
                          <DeleteButton
                            title="Delete Document"
                            icon={<Delete20Regular />}
                            onClick={() => handleOpenConfirmDelete(doc.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </StyledTable>

            {!loading && documents.length < 3 && (
              <FormGroup>
                <HiddenInput
                  type="file"
                  ref={inputRef}
                  onChange={handleAddDocument}
                />
                <Button
                  icon={<DocumentAdd20Regular />}
                  onClick={handleClick}
                  appearance="primary"
                >
                  Add Document
                </Button>
              </FormGroup>
            )}

            {documents.length > 0 && (
              <StyledButton onClick={handleOpenGenerateQuizDialog} appearance="primary"
                icon={<Play24Regular />}  >
                Generate Quiz
              </StyledButton>
            )}
          </Card>
        </Container>}
      <Divider />

      <Card style={{ margin: '24px', borderRadius: '10px', padding: '24px' }}>
        <Text size={500} weight="semibold">Available Quizes</Text>
        <Text size={400}>Quizes just created but the user not attempt this</Text>
        <StyledTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Quiz Name</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ?
              <TableRow>
                <TableCell colSpan={3}>
                  <Spinner style={{ padding: '10px' }} label="Loading documents..." size={SpinnerSize.medium} />
                </TableCell>
              </TableRow>
              : documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Text>No Quizes added yet.</Text>
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.id}</TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>
                      <QuizActions>
                        <Button
                          appearance="primary"
                          title="View Quiz"
                          icon={<Eye20Regular />}
                          onClick={() => handleOpenConfirmDelete(doc.id)}
                        />

                        <Button
                          appearance="primary"
                          title="Start Quiz"
                          icon={<Play20Regular />}
                          onClick={() => handleOpenConfirmDelete(doc.id)}
                        />

                        <DeleteButton
                          title="Delete Quiz"
                          icon={<Delete20Regular />}
                          onClick={() => handleOpenConfirmDelete(doc.id)}
                        />
                      </QuizActions>
                    </TableCell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </StyledTable>

      </Card>

      <Card style={{ margin: '24px', borderRadius: '10px', padding: '24px' }}>
        <Text size={500} weight="semibold">Completed Quizes</Text>
        <Text size={400}>Quizes already finished</Text>
        <StyledTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Quiz Name</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ?
              <TableRow>
                <TableCell colSpan={3}>
                  <Spinner style={{ padding: '10px' }} label="Loading documents..." size={SpinnerSize.medium} />
                </TableCell>
              </TableRow>
              : documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Text>No Quizes added yet.</Text>
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.id}</TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>
                      <QuizActions>
                        <Button
                          title="View Quiz"
                          appearance="primary"
                          icon={<Eye20Regular />}
                          onClick={() => handleOpenConfirmDelete(doc.id)}
                        />

                        <DeleteButton
                          title="Delete Quiz"
                          icon={<Delete20Regular />}
                          onClick={() => handleOpenConfirmDelete(doc.id)}
                        />
                      </QuizActions>
                    </TableCell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </StyledTable>

      </Card>

      {isOpenGenerateDialog && id && <GenerateQuizDialog categoryId={id} isOpenGenerateDialog={isOpenGenerateDialog} setIsOpenGenerateDialog={setIsOpenGenerateDialog} onGenerateQuiz={handleGenerateQuiz} quizName={quizName} setQuizName={setQuizName} difficulty={difficulty} setDifficulty={setDifficulty} />}

      {loadingDialog && <LoadingDialog loadingDialog={loadingDialog} />}

      {confirmDelete && selectedDocumentId && <ConfirmDeleteDialog documentId={selectedDocumentId} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} onDeleteDocument={handleDeleteDocument} />}

    </PageWrapper>
  );
};

export default Category;
