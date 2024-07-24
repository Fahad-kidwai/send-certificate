// import React, { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import { Label } from '../ui/label';
// import {
//   SelectGroup,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';
// import { SlidesSelector } from '../pickerUtils/SlidesSelector';
// import { FolderSelector } from '../pickerUtils/FolderSelector';
// import { serverFunctions } from '../../utils/serverFunctions';
// import { useApp, updateInfo } from '../../contexts';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CertificateSettingsForm = ({
//   selectedSlidesName,
//   templateUrl,
//   templateID,
//   passingScore,
//   fileFormat,
//   dateFormat,
//   // ... other props and functions
// }) => {
//   const [isSaving, setIsSaving] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   const handleSave = async () => {
//     // Implement validation logic here
//     if (!false) {
//       setFormErrors({
//         /* error messages */
//       });
//       return;
//     }

//     setIsSaving(true);
//     try {
//       // Save certificate settings logic
//       console.log('setting saved');
//       toast.success('Settings saved');
//     } catch (error) {
//       console.error('Error saving settings:', error);
//       toast.error('An error occurred. Please try again later.');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // ... other functions for handling input changes

//   return (
//     // JSX for form elements with error messages if applicable
//     <div className="h-full">
//       <Button className=" w-full mt-1" disabled={isDisable} onClick={showTags}>
//         Merge Tags
//       </Button>

//       <div id="form">
//         <div>
//           <Label htmlFor="passing" className=" pt-1">
//             Passing
//           </Label>
//           <Select
//             value={passingScore}
//             onValueChange={(val) => {
//               setPassingScore(val);
//               updateInfo({ passingScore: val });
//             }}
//           >
//             <SelectTrigger className="w-[260px]">
//               <SelectValue placeholder="Select passing score" />
//             </SelectTrigger>
//             <SelectContent className="">
//               <SelectItem value="100">100%</SelectItem>
//               <SelectItem value="95">95%</SelectItem>
//               <SelectItem value="90">90%</SelectItem>
//               <SelectItem value="85">85%</SelectItem>
//               <SelectItem value="80">80%</SelectItem>
//               <SelectItem value="70">70%</SelectItem>
//               <SelectItem value="60">60%</SelectItem>
//               <SelectItem value="50">50%</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Label htmlFor="template" className=" mt-1">
//           Template
//         </Label>
//         <SlidesSelector
//           //   setSelectedSlidesName={setSelectedSlidesName}
//           //   setTemplateUrl={setTemplateUrl}
//           //   setTemplateID={setTemplateID}
//           change={(name, url, Id) => {
//             updateInfo({
//               selectedSlidesName: name,
//               templateID: Id,
//               templateUrl: url,
//             });
//           }}
//         />
//         <Label htmlFor="folder" className=" mt-1">
//           Folder
//         </Label>
//         <FolderSelector
//         //   setFolderID={setFolderID}
//         //   setFolderName={setFolderName}
//         //   setFolderUrl={setFolderUrl}
//           change={(name, url, Id) => {
//             updateInfo({
//               folderName: name,
//               folderID: Id,
//               folderUrl: url,
//             });
//           }}
//         />
//         <Label htmlFor="fileFormat" className=" mt-1">
//           File Format
//         </Label>
//         <Select
//           value={fileFormat}
//           onValueChange={(val) => {
//             updateInfo({ fileFormat: val });
//           }}
//         >
//           <SelectTrigger className="w-[260px]">
//             <SelectValue placeholder="Select format" />
//           </SelectTrigger>
//           <SelectContent className="">
//             <SelectItem value="application/pdf">PDF</SelectItem>
//             <SelectItem value="image/png">IMG</SelectItem>
//           </SelectContent>
//         </Select>
//         <Label htmlFor="dateFormat" className=" mt-1">
//           Date Format
//         </Label>
//         {/* <Input id="dateFormat" /> */}
//         <Select
//           value={dateFormat}
//           onValueChange={(val) => {
//             updateInfo({ dateFormat: val });
//           }}
//         >
//           <SelectTrigger className="w-[260px]">
//             <SelectValue placeholder="Select format" />
//           </SelectTrigger>
//           <SelectContent className="">
//             <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
//             <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
//             <SelectItem value="MM-dd-YYYY">MM-DD-YYYY</SelectItem>
//             <SelectItem value="dd-MM-YYYY">DD-MM-YYYY</SelectItem>
//             <SelectItem value="MM.dd.YYYY">MM.DD.YYYY</SelectItem>
//             <SelectItem value="dd.MM.YYYY">DD.MM.YYYY</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <Button
//         className=" w-full  mt-2 mb-2"
//         disabled={settingDisabled}
//         onClick={saveCertificateSettings}
//       >
//         Save Certificate Settings
//       </Button>
//     </div>
//   );
// };

// const Certificate = () => {
//   const { info, updateInfo } = useApp();

//   return (
//     <div className="h-full">
//       <CertificateSettingsForm
//         {...info} // Pass all necessary props from info object
//         updateInfo={updateInfo}
//       />
//       <Button
//         className=" w-full  mt-2 mb-2"
//         disabled={isSaving}
//         onClick={handleSave}
//       >
//         Save Certificate Settings
//       </Button>
//     </div>
//   );
// };

// export default Certificate;
