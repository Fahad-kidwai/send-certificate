import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { serverFunctions } from '@/utils/serverFunctions';
import { useApp, AppContext } from '../../contexts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Mail = () => {
  const { info, updateInfo } = useContext(AppContext);
  const [senderName, setSenderName] = useState(info.senderName);
  const [cc, setCc] = useState(info.cc);
  const [bcc, setBcc] = useState(info.bcc);
  const [mailSubject, setMailSubject] = useState(info.mailSubject);
  const [mailBody, setMailBody] = useState(info.mailBody);
  const [failedSubject, setFailedSubject] = useState(info.failedSubject);
  const [failedBody, setFailedBody] = useState(info.failedBody);
  const [isDisable, setIsDisable] = useState(false);
  const [settingDisabled, setSettingDisabled] = useState(false);

  const showTags = async () => {
    setIsDisable(true);
    await serverFunctions.showDialog('dialog-tags', 'Tags Dialog');
    setIsDisable(false);
  };

  const saveMailSettings = async () => {
    setSettingDisabled(true);
    if (
      !senderName ||
      !mailSubject ||
      !mailBody ||
      !failedSubject ||
      !failedBody
    ) {
      setSettingDisabled(false);
      toast.warning('Fill out all the fields');
      return;
    }
    const inputs = {
      senderName,
      cc,
      bcc,
      mailSubject,
      mailBody,
      failedSubject,
      failedBody,
    };
    await serverFunctions.saveMailInfo(inputs);
    setSettingDisabled(false);
    toast.success('Settings saved');
  };

  // useEffect(() => {
  //   console.log('effect', info);
  // }, [info]);

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
          value={info.senderName}
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
          value={info.cc}
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
          value={info.bcc}
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
          value={info.mailSubject}
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
          value={info.mailBody}
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
          value={info.failedSubject}
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
          value={info.failedBody}
        />
      </div>

      <Button
        className=" w-full mt-2 mb-2"
        disabled={settingDisabled}
        onClick={saveMailSettings}
      >
        Save Mail Settings
      </Button>
    </div>
  );
};

export default Mail;
