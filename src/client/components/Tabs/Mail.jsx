import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { serverFunctions } from '@/utils/serverFunctions';
import { useApp } from "../../contexts";


const Mail = () => {
  const {info,updateInfo} = useApp()
  const [senderName, setSenderName] = useState(info.senderName);
  const [cc, setCc] = useState(info.cc);
  const [bcc, setBcc] = useState(info.bcc);
  const [mailSubject, setMailSubject] = useState(info.mailSubject);
  const [mailBody, setMailBody] = useState(info.mailBody);
  const [failedSubject, setFailedSubject] = useState(info.failedSubject);
  const [failedBody, setFailedBody] = useState(info.failedBody);
  const [isDisable, setIsDisable] = useState(false);

  const showTags = async () => {
    setIsDisable(true);
    await serverFunctions.showDialog('dialog-tags', 'Tags Dialog');
    setIsDisable(false);
  };

  const saveMailSettings = () => {
    const inputs = {
      senderName,
      cc,
      bcc,
      mailSubject,
      mailBody,
      failedSubject,
      failedBody,
    };
    serverFunctions.saveMailInfo(inputs);
  };

  return (
    <div className="">
      <Button className=" w-full mt-1" disabled={isDisable} onClick={showTags}>
        Merge Tags
      </Button>
      <div id="form">
        <Label htmlFor="sName" className=" pt-1">
          Sender Name
        </Label>
        <Input
          id="sName"
          onChange={(e) => {
            setSenderName(e.target.value);
            updateInfo({ senderName: e.target.value });
          }}
          value={senderName}
        />
        <Label htmlFor="cc" className=" mt-1">
          CC
        </Label>
        <Input
          id="cc"
          onChange={(e) => {
            setCc(e.target.value);
            updateInfo({ cc: e.target.value });
          }}
          value={cc}
        />
        <Label htmlFor="bcc" className=" mt-1">
          BCC
        </Label>
        <Input
          id="bcc"
          onChange={(e) => {
            setBcc(e.target.value);
            updateInfo({ bcc: e.target.value });
          }}
          value={bcc}
        />
        <Label htmlFor="pSubject" className=" mt-1">
          Mail Subject - if passed
        </Label>
        <Input
          id="pSubject"
          onChange={(e) => {
            setMailSubject(e.target.value);
            updateInfo({ mailSubject: e.target.value });
          }}
          value={mailSubject}
        />
        <Label htmlFor="pContent" className=" mt-1">
          Mail Content - if passed
        </Label>
        <Input
          id="pContent"
          onChange={(e) => {
            setMailBody(e.target.value);
            updateInfo({ mailBody: e.target.value });
          }}
          value={mailBody}
        />
        <Label htmlFor="fSubject" className=" mt-1">
          Mail Subject - if failed
        </Label>
        <Input
          id="fSubject"
          onChange={(e) => {
            setFailedSubject(e.target.value);
            updateInfo({ failedSubject: e.target.value });
          }}
          value={failedSubject}
        />
        <Label htmlFor="fContent" className=" mt-1">
          Mail Content - if failed
        </Label>
        <Input
          id="fContent"
          onChange={(e) => {
            setFailedBody(e.target.value);
            updateInfo({ failedBody: e.target.value });
          }}
          value={failedBody}
        />
      </div>

      <Button className=" w-full mt-2" onClick={saveMailSettings}>
        Save Mail Settings
      </Button>
    </div>
  );
};

export default Mail;
