import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { serverFunctions } from '../../utils/serverFunctions';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../contexts';

export const FolderSelector = ({
  setFolderID,
  setFolderName,
  setFolderUrl,
  change,
}) => {
  const { info } = useApp();
  const interval = useRef(null);

  async function showFilePicker() {
    if (interval.current) {
      clearInterval(interval.current);
    }

    const triggerId = crypto.randomUUID();

    try {
      await serverFunctions.showFilePicker(triggerId, 'folder', 'folders');

      interval.current = setInterval(async () => {
        const res = await serverFunctions.getPickedFile(triggerId);
        const data = JSON.parse(res);
        if (data?.action === 'picked') {
          clearInterval(interval.current);
          console.log('console', data);
          setFolderName(data?.docs?.[0]?.name || '');
          setFolderUrl(data?.docs?.[0]?.url || '');
          setFolderID(data?.docs?.[0]?.id || '');
          change(
            data?.docs?.[0]?.name || '',
            data?.docs?.[0]?.url || '',
            data?.docs?.[0]?.id || ''
          );
        } else if (data?.action === 'cancel') {
          // setTriggerID('');
          clearInterval(interval.current);
        }
      }, 2000);
      // const res = await serverFunctions.getPickedFile(triggerId);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const handleRemoveSelectedFolder = (e) => {
    e.stopPropagation();
    setFolderName('');
    setFolderID('');
    setFolderUrl('');
    change('', '', '');
  };

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className="w-full flex justify-start cursor-pointer pr-2"
        asChild
        onClick={showFilePicker}
      >
        <div className="flex justify-between gap-2">
          <div className="flex gap-3 flex-auto">
            <img src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder" />
            {info.folderName ? (
              <a
                className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold hover:text-blue-600"
                target="_blank"
                href={info.folderUrl}
                onClick={(e) => e.stopPropagation()}
              >
                {info.folderName}
              </a>
            ) : (
              <span>Select Folder</span>
            )}
          </div>
          <Upload />
          {info.folderName && (
            <X size={18} onClick={handleRemoveSelectedFolder} />
          )}
        </div>
      </Button>
    </div>
  );
};
