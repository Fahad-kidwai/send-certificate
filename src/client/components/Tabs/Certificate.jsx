import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  SelectGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { SlidesSelector } from '../pickerUtils/SlidesSelector';
import { FolderSelector } from '../pickerUtils/FolderSelector';
import { serverFunctions } from '../../utils/serverFunctions';
import { useApp } from '../../contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Certificate = () => {
  const { info, updateInfo } = useApp();
  console.log(info, 'info in cert');
  const [selectedSlidesName, setSelectedSlidesName] = useState(
    info.selectedSlidesName
  );
  // const [templateUrl, setTemplateUrl] = useState(info.templateUrl);
  // const [templateID, setTemplateID] = useState(info.templateID);
  // const [passingScore, setPassingScore] = useState(info.passingScore);
  // const [fileFormat, setFileFormat] = useState(info.fileFormat);
  // const [dateFormat, setDateFormat] = useState(info.dateFormat);
  // const [folderID, setFolderID] = useState(info.folderID);
  // const [folderName, setFolderName] = useState(info.folderName);
  // const [folderUrl, setFolderUrl] = useState(info.folderUrl);
  const [isDisable, setIsDisable] = useState(false);
  const [settingDisabled, setSettingDisabled] = useState(false);

  const showTags = async () => {
    setIsDisable(true);
    await serverFunctions.showDialog('dialog-tags', 'Tags Dialog');
    setIsDisable(false);
  };

  const saveCertificateSettings = async () => {
    setSettingDisabled(true);
    if (
      !info.selectedSlidesName ||
      !info.templateID ||
      !info.templateUrl ||
      !info.folderID ||
      !info.folderName ||
      !info.folderUrl ||
      !info.passingScore ||
      !info.fileFormat ||
      !info.dateFormat
    ) {
      setSettingDisabled(false);
      toast.warning('Fill out all the fields');
      return;
    }
    const inputs = {
      selectedSlidesName: info.selectedSlidesName,
      templateID: info.templateID,
      templateUrl: info.templateUrl,
      folderID: info.folderID,
      folderName: info.folderName,
      folderUrl: info.folderUrl,
      passingScore: info.passingScore,
      fileFormat: info.fileFormat,
      dateFormat: info.dateFormat,
    };
    await serverFunctions.saveCertificateInfo(inputs);
    console.log('setting saved');
    toast.success('Settings saved');
    setSettingDisabled(false);
    serverFunctions.fetchTemplateTags();
  };

  return (
    <div className="h-full">
      <Button className=" w-full mt-1" disabled={isDisable} onClick={showTags}>
        Merge Tags
      </Button>

      <div id="form">
        <div>
          <Label htmlFor="passing" className=" pt-1">
            Passing
          </Label>
          <Select
            value={info.passingScore}
            onValueChange={(val) => {
              setPassingScore(val);
              updateInfo({ passingScore: val });
            }}
          >
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select passing score" />
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
        <Label htmlFor="template" className=" mt-1">
          Template
        </Label>
        <SlidesSelector
          setSelectedSlidesName={setSelectedSlidesName}
          setTemplateUrl={setTemplateUrl}
          setTemplateID={setTemplateID}
          change={(name, url, Id) => {
            updateInfo({
              selectedSlidesName: name,
              templateID: Id,
              templateUrl: url,
            });
          }}
        />
        <Label htmlFor="folder" className=" mt-1">
          Folder
        </Label>
        <FolderSelector
          setFolderID={setFolderID}
          setFolderName={setFolderName}
          setFolderUrl={setFolderUrl}
          change={(name, url, Id) => {
            updateInfo({
              folderName: name,
              folderID: Id,
              folderUrl: url,
            });
          }}
        />
        <Label htmlFor="fileFormat" className=" mt-1">
          File Format
        </Label>
        <Select
          value={info.fileFormat}
          onValueChange={(val) => {
            setFileFormat(val);
            updateInfo({ fileFormat: val });
          }}
        >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="application/pdf">PDF</SelectItem>
            <SelectItem value="image/png">IMG</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="dateFormat" className=" mt-1">
          Date Format
        </Label>
        {/* <Input id="dateFormat" /> */}
        <Select
          value={info.dateFormat}
          onValueChange={(val) => {
            setDateFormat(val);
            updateInfo({ dateFormat: val });
          }}
        >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
            <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
            <SelectItem value="MM-dd-YYYY">MM-DD-YYYY</SelectItem>
            <SelectItem value="dd-MM-YYYY">DD-MM-YYYY</SelectItem>
            <SelectItem value="MM.dd.YYYY">MM.DD.YYYY</SelectItem>
            <SelectItem value="dd.MM.YYYY">DD.MM.YYYY</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className=" w-full  mt-2 mb-2"
        disabled={settingDisabled}
        onClick={saveCertificateSettings}
      >
        Save Certificate Settings
      </Button>
    </div>
  );
};

export default Certificate;
