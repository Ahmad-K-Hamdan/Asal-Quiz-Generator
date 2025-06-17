import * as React from "react";
import {
  EyeRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  Input,
  Badge,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Text,
  CardFooter,
} from "@fluentui/react-components";
import { Link } from "@fluentui/react";
import { Pagination } from "./Pagination";
import { ActionsCell, Container, Header, StyledCard, Toolbar } from "./Categories.styles";



const categories = [
  { id: 1, name: "Operating System", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 2, name: "Networking", numberOfDocuments: 2, maxDocuments: 3 },
  { id: 3, name: "Software Engineering", numberOfDocuments: 3, maxDocuments: 3 },
  { id: 4, name: "Electronics", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 5, name: "Computer Architecture", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 6, name: "Data Structures", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 7, name: "Algorithms", numberOfDocuments: 1, maxDocuments: 3 },
  { id: 8, name: "Database Management Systems", numberOfDocuments: 1, maxDocuments: 3 },
];

const getStatus = (count: number, max: number) => {
  return count >= max ? "full" : "available";
};

const getStatusColor = (status: string) => {
  return status === "full" ? "danger" : "brand";
};

export const Categories = () => {
  const [items, setItems] = React.useState(categories);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const start = (currentPage-1) *itemsPerPage
  const end = currentPage*itemsPerPage 
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDocs = items.reduce(
    (sum, item) => sum + item.numberOfDocuments,
    0
  );

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newItem = {
      id: items.length + 1,
      name: newCategoryName,
      numberOfDocuments: 0,
      maxDocuments: 3,
    };
    setItems((prev) => [...prev, newItem]);
    setNewCategoryName("");
    setAddDialogOpen(false);
  };

  return (
      <Container>
        <Header>
          <Text weight="bold" size={700}>Categories</Text>
          <Text size={300} block>Total Categories: {items.length} | Total Documents: {totalDocs}</Text>
        </Header>

        <Toolbar>
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button appearance="primary" onClick={() => setAddDialogOpen(true)}>
            + Add Category
          </Button>
        </Toolbar>

        <StyledCard>
          {filteredItems.length === 0 ? (
            <Text>No categories found.</Text>
          ) : (
            <Table aria-label="Styled categories table" style={{ width: "100%" }}>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Documents</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.slice(start,end).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TableCellLayout>
                        <strong>{item.name}</strong>
                      </TableCellLayout>
                    </TableCell>
                    <TableCell>
                      {item.numberOfDocuments}{" "}
                      <Badge appearance="outline" color={getStatusColor(getStatus(item.numberOfDocuments, item.maxDocuments))}>
                        {getStatus(item.numberOfDocuments, item.maxDocuments)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ActionsCell>
                        <Link href={`/categories/${item.id}`}>
                          <Button size="small" icon={<EyeRegular />} appearance="secondary">
                            View
                          </Button>
                        </Link>
                        <Button
                          size="small"
                          icon={<DeleteRegular />}
                          appearance="subtle"
                          color="danger"
                          onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                        >
                          Delete
                        </Button>
                      </ActionsCell>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <CardFooter>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page)=>setCurrentPage(page)}/>
          </CardFooter>
        </StyledCard>

        <Dialog open={addDialogOpen} onOpenChange={(_, data) => setAddDialogOpen(data.open)}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogContent>
                <Input
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{ marginBottom: 12 }}
                />
              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button appearance="primary" onClick={handleAddCategory}>
                  Add
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </Container>
  );
};
