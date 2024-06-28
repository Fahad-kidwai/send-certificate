import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { serverFunctions } from '@/utils/serverFunctions';

const Mail = () => {
  const [senderName, setSenderName] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');
  const [failedSubject, setFailedSubject] = useState('');
  const [failedBody, setFailedBody] = useState('');

  const saveMailSettings = () => {
    console.log(
      senderName,
      cc,
      bcc,
      mailSubject,
      mailBody,
      failedBody,
      failedSubject
    );
  };

  return (
    <div className=" overflow-auto">
      <Button className=" w-full">Merge Tags</Button>

      <div id="form">
        <Label htmlFor="sName" className=" mt-1">
          Sender Name
        </Label>
        <Input
          id="sName"
          onChange={(e) => {
            setSenderName(e.target.value);
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
          }}
          value={failedBody}
        />
        <div className="flex justify-center">
          <Button className=" mt-2" onClick={saveMailSettings}>
            Save Mail Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Mail;
