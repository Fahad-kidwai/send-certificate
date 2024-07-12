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

// [
//     { replacedValue: 'reached points', tags: 'Full name' },
//     {}
// ];

export const App = () => {
  const [rows, setRows] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [mergedTags, setMergedTags] = useState([]);
  const [isloader, setIsloader] = useState(false);

  let systemGeneratedQuestionTags = [
    'Reached Percentage',
    'Reached Points',
    'Form Name',
    'Date',
  ];

  const addRow = () => {
    setRows([...rows, { replacedValue: '', tag: '' }]);
  };

  const onValueChange = (val, index, key) => {
    const copyRows = [...rows];
    copyRows[index][key] = val;
    setRows(copyRows);
  };

  const saveTags = () => {
    let newMergedTags = [];
    const filteredTags = rows.filter((ele) => ele.replacedValue && ele.tag);
    filteredTags.map((obj) => {
      let temp = [];
      temp.push(obj.replacedValue);
      temp.push(obj.tag);
      newMergedTags.push(temp);
    });
    setMergedTags((prev) => [...prev, ...newMergedTags]);
    setRows([]);
    serverFunctions.saveTags(newMergedTags);
  };

  const getDetails = async () => {
    setIsloader(true);
    setIsAdd(true);

    const formQuestions = await serverFunctions.fetchFormDetails();
    const templateTags = await serverFunctions.fetchTemplateTags();
    setTags(templateTags);
    setQuestions(formQuestions);
    setIsAdd(false);
    setIsloader(false);

    const properties = await serverFunctions.getAllProperties();
    if (properties.mergedTags) {
      const val = JSON.parse(properties.mergedTags);
      setMergedTags(val);
    }
  };

  const handleDelete = (index) => {
    let changedTags = mergedTags.filter((arr, i) => i != index);
    setMergedTags(changedTags);
    serverFunctions.saveTags(changedTags, true);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {isloader && (
        <Loader
          type="spinner-default"
          color="black"
          bgColor="rgb(218,220,224)"
          size={50}
          className=" absolute top-40"
        />
      )}

      {!isloader && (
        <div>
          <div id="selectDiv">
            {rows.map((row, index) => (
              <div
                key={index}
                className=" flex justify-center gap-1 py-1 rounded-lg border-black"
              >
                <Select
                  value={row.replacedValue}
                  onValueChange={(val) =>
                    onValueChange(val, index, 'replacedValue')
                  }
                >
                  <SelectTrigger className=" w-[300px]">
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
                  value={row.tag}
                  onValueChange={(val) => onValueChange(val, index, 'tag')}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select Tag" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {tags.map((tag, index) => {
                      let disabled = false;
                      let temp = mergedTags.map((arr) => arr[1]);
                      console.log(temp);
                      for (let i = 0; i < mergedTags.length; i++) {
                        if (temp.includes(tag)) disabled = true;
                        console.log(disabled);
                      }
                      return (
                        <SelectItem key={index} value={tag} disabled={disabled}>
                          {tag}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className=" flex justify-center gap-8 py-4">
            <Button disabled={isAdd} onClick={addRow} className="">
              Add Row
            </Button>
            <Button onClick={saveTags} hidden={rows.length > 0}>
              Save
            </Button>
          </div>
          <div>
            {mergedTags.length > 0 && (
              <Table className=" border-gray-400 border">
                <TableCaption>List of merged tags</TableCaption>
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
          </div>
        </div>
      )}
    </>
  );
};
