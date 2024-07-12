import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { serverFunctions } from '../../utils/serverFunctions';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../contexts';

export const SlidesSelector = ({
  setSelectedSlidesName,
  setTemplateUrl,
  setTemplateID,
  setTriggerID,
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
      await serverFunctions.showFilePicker(triggerId, 'file');

      interval.current = setInterval(async () => {
        const res = await serverFunctions.getPickedFile(triggerId);
        const data = JSON.parse(res);
        if (data?.action === 'picked') {
          clearInterval(interval.current);
          setTriggerID(triggerId);
          setSelectedSlidesName(data?.docs?.[0]?.name || '');
          setTemplateUrl(data?.docs?.[0]?.url || '');
          setTemplateID(data?.docs?.[0]?.id || '');
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
      // toast.error(error.message);
    }
  }

  const handleRemoveSelectedSheet = (e) => {
    e.stopPropagation();
    setSelectedSlidesName('');
    change('', '', '');
    setTriggerID('');
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
            <img src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.presentation" />
            {info.selectedSlidesName ? (
              <a
                className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold hover:text-blue-600"
                target="_blank"
                href={info.templateUrl}
                onClick={(e) => e.stopPropagation()}
              >
                {info.selectedSlidesName}
              </a>
            ) : (
              <span>Select Slide</span>
            )}
          </div>
          {info.selectedSlidesName && (
            <X size={18} onClick={handleRemoveSelectedSheet} />
          )}
        </div>
      </Button>
    </div>
  );
};
