import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { v4 as uuidv4 } from 'uuid';

const initialTransactions = [
  { id: uuidv4(), date: '2023-01-01', amount: 200, type: 'Income', brand: 'Nike' },
  { id: uuidv4(), date: '2023-02-15', amount: 150, type: 'Expense', brand: 'Adidas' },
];

const App = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [form, setForm] = useState({ date: '', amount: '', type: '', brand: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleAddTransaction = () => {
    if (isEditing) {
      setTransactions(transactions.map((t) => (t.id === currentId ? { ...form, id: currentId } : t)));
      setIsEditing(false);
      toast({ title: 'Transaction updated successfully!' });
    } else {
      setTransactions([...transactions, { ...form, id: uuidv4() }]);
      toast({ title: 'Transaction added successfully!' });
    }
    setForm({ date: '', amount: '', type: '', brand: '' });
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setForm(transaction);
    setCurrentId(id);
    setIsEditing(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast({ title: 'Transaction deleted successfully!' });
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Track Your Sneaker Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <Label>Date</Label>
            <Input name="date" type="date" value={form.date} onChange={handleInputChange} />
            <Label>Amount</Label>
            <Input name="amount" type="number" value={form.amount} onChange={handleInputChange} />
            <Label>Type</Label>
            <Select value={form.type} onValueChange={(value) => handleSelectChange('type', value)}>
              <SelectTrigger className="w-full">Select Type</SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Label>Brand</Label>
            <Select value={form.brand} onValueChange={(value) => handleSelectChange('brand', value)}>
              <SelectTrigger className="w-full">Select Brand</SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddTransaction}>{isEditing ? 'Update' : 'Add'} Transaction</Button>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.brand}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEditTransaction(transaction.id)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ToastProvider>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export default App;