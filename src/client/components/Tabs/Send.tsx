import React, { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '../ui/label'
import { serverFunctions } from '@/utils/serverFunctions'


const Send = () => {
  const [isChecked,setIsChecked] = useState(false)
  const handleSwitchChange = (c)=> {
    console.log(c)
    setIsChecked((prev)=>!prev)
    serverFunctions.switchAddOn(isChecked)
    console.log({isChecked})
  }
  return (
    <div className=''>
        <h2 className=''>Switch Add-On</h2>
        <Label>On/Off</Label>
        <Switch disabled={isChecked} className=' mx-2' onCheckedChange={handleSwitchChange} />
    </div>
  )
}

export default Send