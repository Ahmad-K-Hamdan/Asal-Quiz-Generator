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
} from "@fluentui/react-components";
import { DocumentAdd20Regular } from "@fluentui/react-icons";
import { ButtonsContainer, Container, FormGroup, HiddenInput, StyledButton, StyledTable } from "./Category.styles";


type CategoryType = {
  id: number;
  name: string;
  numberOfDocuments: number;
  maxDocuments: number;
};

type Document = {
  id: number;
  name: string;
  uploadedAt: string;
};

const categories: CategoryType[] = [
  { id: 1, name: "Operating System", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 2, name: "Networking", numberOfDocuments: 2, maxDocuments: 3 },
  { id: 3, name: "Software Engineering", numberOfDocuments: 3, maxDocuments: 3 },
  { id: 4, name: "Electronics", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 5, name: "Computer Architecture", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 6, name: "Data Structures", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 7, name: "Algorithms", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 8, name: "Database Management Systems", numberOfDocuments: 1, maxDocuments: 3 },
];

const mockDocuments: Record<number, Document[]> = {
  1: [{ id: 1, name: "Process Scheduling.pdf", uploadedAt: "2025-05-10" }],
  2: [
    { id: 1, name: "TCP_IP_Model.docx", uploadedAt: "2025-05-08" },
    { id: 2, name: "OSI_Layers.pdf", uploadedAt: "2025-05-09" },
  ],
  3: [
    { id: 1, name: "SDLC_Phases.pdf", uploadedAt: "2025-05-05" },
    { id: 2, name: "Agile_Overview.docx", uploadedAt: "2025-05-06" },
    { id: 3, name: "UML_Diagrams.pdf", uploadedAt: "2025-05-07" },
  ],
};

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const [category, setCategory] = React.useState<CategoryType | null>(null);
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = React.useState(false);
  const [isGeneratedQuiz, setIsGeneratedQuiz] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;
    const foundCategory = categories.find((cat) => cat.id === parseInt(id));
    if (foundCategory) {
      setCategory(foundCategory);
      setDocuments(mockDocuments[foundCategory.id] || []);
    }
  }, [id]);
  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  function handleAddDocument(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    //API call to upload the document
    //API call to get all documents
  }
  function handleGenerateQuiz() {
    // this will changed later 
    setIsGeneratingQuiz(true);
    setTimeout(() => {
      setIsGeneratingQuiz(false);
      setIsGeneratedQuiz(true);
 }, 2000);
    //API call to generate quiz
    // finally (setIsGeneratingQuiz(false);setIsGeneratedQuiz(true))
  }

  if (!category) return <Text>Loading category...</Text>;

  return (
    <>
    {isGeneratingQuiz || isGeneratedQuiz ? (
  <Container>
    <Card>
      <Text size={700} weight="bold">{category.name}</Text>
      <Text size={400}>Documents ({documents.length} / {category.maxDocuments})</Text>
    </Card>

    <Card>
      <Text size={500} weight="semibold">
        {isGeneratingQuiz ? "Generating your quiz..." : "The quiz is ready!"}
      </Text>
      {isGeneratedQuiz && (
        <ButtonsContainer>
          <Button appearance="primary" onClick={() => navigate("/view-quiz")}>
            View Quiz
          </Button>
        </ButtonsContainer>
      )}
    </Card>
  </Container>
) :
                <Container>
      <Card>
        <Text size={700} weight="bold">{category.name}</Text>
        <Text size={400}>Documents ({documents.length} / {category.maxDocuments})</Text>
      </Card>

      <StyledTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Document Name</TableHeaderCell>
            <TableHeaderCell>Uploaded At</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
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
                <TableCell>{doc.uploadedAt}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>

      {documents.length < category.maxDocuments && (
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
        <StyledButton onClick={handleGenerateQuiz} appearance="primary"  >
          Generate Quiz
        </StyledButton>
      )}
    </Container>}
        </>
  );
};

export default Category;
