import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { serverFunctions } from '../../utils/serverFunctions';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export const SlidesSelector = ({
  selectedSlidesName,
  setSelectedSlidesName,
  setTriggerID,
  setTemplateID,
  change,
}) => {
  console.log("info in slideSelector",selectedSlidesName)
  const interval = useRef(null);

  async function showFilePicker() {
    if (interval.current) {
      clearInterval(interval.current);
    }

    const triggerId = crypto.randomUUID();
    console.log(triggerId);

    try {
      await serverFunctions.showFilePicker(triggerId, 'file');

      interval.current = setInterval(async () => {
        const res = await serverFunctions.getPickedFile(triggerId);
        const data = JSON.parse(res);
        console.log('data: ', data);
        if (data?.action === 'picked') {
          clearInterval(interval.current);
          setTriggerID(triggerId);
          setSelectedSlidesName(data?.docs?.[0]?.name || '');
          setTemplateID(data?.docs?.[0]?.id || '')
          change()
        } else if (data?.action === 'cancel') {
          // setTriggerID('');
          clearInterval(interval.current);
        }
      }, 2000);
      // console.log('Res1:', res1);
      // const res = await serverFunctions.getPickedFile(triggerId);
    } catch (error) {
      console.log('Error Here');
      console.error(error);
      // toast.error(error.message);
    }
  }

  const handleRemoveSelectedSheet = (e) => {
    e.stopPropagation();
    setSelectedSlidesName('');
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
            {selectedSlidesName ? (
              <span className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                {selectedSlidesName}
              </span>
            ) : (
              <span>Select Slide</span>
            )}
          </div>
          {selectedSlidesName && (
            <X size={18} onClick={handleRemoveSelectedSheet} />
          )}
        </div>
      </Button>
    </div>
  );
};
