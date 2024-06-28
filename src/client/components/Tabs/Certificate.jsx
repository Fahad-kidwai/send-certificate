import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  SelectGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import  {SlidesSelector } from '../pickerUtils/SlidesSelector';

const Certificate = () => {
  const [triggerID, setTriggerID] = useState('');
  const [selectedSlidesName, setSelectedSlidesName] = useState('');
  const [templateID, setTemplateID] = useState('')
  const [passingScore,setPassingScore] = useState('')
  const [fileFormat,setFileFormat] = useState('')
  const [dateFormat,setDateFormat] = useState('')

  const saveCertificateSettings = () => {
    console.log(
      {selectedSlidesName},{templateID},{passingScore},{fileFormat},{dateFormat}
    )
  }

  return (
    <div className=' overflow-auto'>
      <Button  className=' w-full'>
        Merge Tags
      </Button>

      <div id="form">
        <div>
          <Label htmlFor="passing" className=' mt-1' >Passing</Label>
          <Select value={passingScore} onValueChange={(val)=>{setPassingScore(val)}}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select passing score"/>
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="100">100%</SelectItem>
              <SelectItem value="95">95%</SelectItem>
              <SelectItem value="90">90%</SelectItem>
              <SelectItem value="85">85%</SelectItem>
              <SelectItem value="80">80%</SelectItem>
              <SelectItem value="70">70%</SelectItem>
              <SelectItem value="60">60%</SelectItem>
              <SelectItem value="50">50%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Label htmlFor="template" className=' mt-1'>Template</Label>
        <SlidesSelector 
           selectedSlidesName ={selectedSlidesName}
           setSelectedSlidesName = {setSelectedSlidesName}
           setTriggerID = {setTriggerID}
           setTemplateID = {setTemplateID}
        />
        {/* <Input id="template" type="file" className="w-[260px]"/> */}
        <Label htmlFor="fileFormat" className=' mt-1'>File Format</Label>
        <Select value={fileFormat} onValueChange={(val)=>{setFileFormat(val)}} >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent  className="">
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="img">IMG</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="dateFormat" className=' mt-1'>Date Format</Label>
        {/* <Input id="dateFormat" /> */}
        <Select value={dateFormat} onValueChange={(val)=>{setDateFormat(val)}}>
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent  className="">
            <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
            <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
            <SelectItem value="MM-DD-YYYY">MM-DD-YYYY</SelectItem>
            <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
            <SelectItem value="MM.DD.YYYY">MM.DD.YYYY</SelectItem>
            <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
          </SelectContent>
        </Select>
        {/* <Label htmlFor='pContent'>Mail Content - if passed</Label>
      <Input id='pContent' />
      <Label htmlFor='fSubject'>Mail Subject - if failed</Label>
      <Input id='fSubject' />
      <Label htmlFor='fContent'>Mail Content - if failed</Label>
      <Input id='fContent' /> */}
      <div className='flex justify-center'>
        <Button className=" mt-2" onClick={saveCertificateSettings}>Save Certificate Settings</Button>
      </div>
      </div>
    </div>
  );
};

export default Certificate;
