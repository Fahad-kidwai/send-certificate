import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '../components/ui/select';
import Loader from 'react-js-loader';
import { serverFunctions } from '@/utils/serverFunctions';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export const App = () => {
  const [row, setRow] = useState({ replacedValue: '', tag: '' });
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [mergedTags, setMergedTags] = useState([]);
  const [isloader, setIsloader] = useState(false);

  let systemGeneratedQuestionTags = [
    'Reached Percentage',
    'Reached Points',
    'Form Name',
    'Date',
  ];

  const addRow = () => {
    if (row.replacedValue && row.tag) {
      let temp = [];
      temp.push(row.replacedValue);
      temp.push(row.tag);
      console.log('temp', temp);
      console.log(mergedTags);
      setMergedTags((prev) => [...prev, temp]);
      setRow({ replacedValue: '', tag: '' });
      setHidden(true);
    } else {
      console.log('error- Select from both the Dropdowns');
      toast.warning('Select from both the Dropdowns');
    }
  };

  const onValueChange = (val, k) => {
    const copy = { ...row };
    copy[k] = val;
    console.log(copy);
    setRow(copy);
  };

  const saveTags = async () => {
    console.log(row);
    await serverFunctions.saveTags(mergedTags, true);
    toast.success('Tags are saved');
    setHidden(false);
  };

  const getDetails = async () => {
    setIsloader(true);
    try {
      const formQuestions = await serverFunctions.fetchFormDetails();
      const templateTags = await serverFunctions.fetchTemplateTags();
      setTags(templateTags);
      setQuestions(formQuestions);

      const properties = await serverFunctions.getAllProperties();
      if (properties.mergedTags) {
        const val = JSON.parse(properties.mergedTags);
        setMergedTags(val);
      }
    } catch (error) {
      toast.warning(error.message);
    }
    setIsloader(false);
  };

  const handleDelete = (index) => {
    let changedTags = mergedTags.filter((arr, i) => i != index);
    console.log(changedTags, 'changedTags');
    setMergedTags(changedTags);
    setHidden(true);
    // serverFunctions.saveTags(changedTags, true);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div id="selectDiv">
        <div className=" flex justify-center gap-4 py-1">
          <Select
            value={row.replacedValue}
            onValueChange={(val) => onValueChange(val, 'replacedValue')}
          >
            <SelectTrigger className=" w-64">
              <SelectValue placeholder="Select Questions" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel className=" bg-primary text-primary-foreground w-full">
                  System Generated
                </SelectLabel>
                {systemGeneratedQuestionTags.map((tag, index) => (
                  <SelectItem key={index} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className=" bg-primary text-primary-foreground w-full">
                  Form Questions
                </SelectLabel>
                {questions.map((question, index) => (
                  <SelectItem key={index} value={question}>
                    {question}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={row['tag']}
            onValueChange={(val) => onValueChange(val, 'tag')}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Tag" />
            </SelectTrigger>
            <SelectContent className="">
              {tags.map((tag, index) => {
                let disabled = false;
                let temp = mergedTags.map((arr) => arr[1]);
                for (let i = 0; i < mergedTags.length; i++) {
                  if (temp.includes(tag)) disabled = true;
                }
                return (
                  <SelectItem key={index} value={tag} disabled={disabled}>
                    {tag}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button onClick={addRow} className="">
            Add Row
          </Button>
        </div>
      </div>
      {isloader && (
        <Loader
          type="spinner-default"
          color="black"
          bgColor="rgb(218,220,224)"
          size={50}
          className=" relative top-1/3"
        />
      )}
      {!isloader && (
        <div className=" mt-2">
          {mergedTags.length > 0 && (
            <Table className=" border-gray-400 border">
              {/* <TableCaption>List of merged tags</TableCaption> */}
              <TableHeader className=" bg-primary">
                <TableHead className="text-primary-foreground">
                  Replacing Value
                </TableHead>
                <TableHead className="text-primary-foreground">Tag</TableHead>
                <TableHead className="text-primary-foreground"></TableHead>
              </TableHeader>
              <TableBody>
                {mergedTags.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(index)}
                      >
                        <FaRegTrashAlt className=" text-gray-700 bg-transparent" />
                      </Button>{' '}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {mergedTags.length < 1 && (
            <div className=" flex justify-center mt-8">
              <h3>Add row to create a list of merged tags</h3>
            </div>
          )}
        </div>
      )}
      {mergedTags.length > 0 && (
        <>
          <div className=" flex justify-center mt-2">
            {hidden && <Button onClick={saveTags}>Save</Button>}
          </div>
        </>
      )}
      {/* <ToastContainer position="bottom-right" hideProgressBar={false} />/ */}
      <Toaster />
    </>
  );
};
