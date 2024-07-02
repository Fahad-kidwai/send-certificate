import React, { useId, useState } from 'react';
import {
  Table,
  TableBody,
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
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

// [
//     { replacedValues: 'reached points', tags: 'Full name' },
//     {}
// ];

export const App = () => {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    // let node = '#selecDiv';

    setRows([...rows, { replacedValues: '', tags: '' }]);
  };

  const onValueChange = (val, index, key) => {
    const copyRows = [...rows];
    copyRows[index][key] = val;
    setRows(copyRows);
  };

  return (
    <>
      <div id="selectDiv">
        <h4>Select div</h4>
        {rows.map((row, index) => (
          <div key={index} className=" flex justify-center gap-2 px-5 py-1">
            <Select
              value={row.replacedValues}
              onValueChange={(val) =>
                onValueChange(val, index, 'replacedValues')
              }
            >
              <SelectTrigger className=" w-[300px]">
                <SelectValue placeholder="Select Questions" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="reached">Reached Percentage</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={row.tags}
              onValueChange={(val) => onValueChange(val, index, 'tags')}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Tag" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="tag">Tag01</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <Button onClick={addRow}>Add Row</Button>
      <div>
        <Table>
          <TableHeader>
            <TableHead>Replacing Value</TableHead>
            <TableHead>Tag</TableHead>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>tag1</TableCell>
              <TableCell>tag2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};
