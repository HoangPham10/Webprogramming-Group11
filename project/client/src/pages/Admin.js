import React, {useState} from 'react'
import {Box,InputLabel,MenuItem,FormControl} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CreateProduct from './CreateProduct'
import './Admin.css'
import ProductManagement from '../components/ProductManagement';

export default function Admin() {
    const [selectors, setSelectors] = useState('')
    console.log(selectors)
  return (
    <div style={{marginTop: '60px' ,minHeight: '500px'}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200,  }}>
                <InputLabel id="demo-simple-select-standard-label">Choose an action</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectors}
                    onChange={(e) => setSelectors(e.target.value)}
                    label="Action"
                >
                    <MenuItem value={"users"}>User management</MenuItem>
                    <MenuItem value={"products"}>Product management</MenuItem>
                    <MenuItem value={"categories"}>Category management</MenuItem>
                    <MenuItem value={"shipments"}>Shipment management</MenuItem>
                    <MenuItem value={"payments"}>Payment management</MenuItem>


                </Select>
            </FormControl>
            
        <div>
            {selectors === 'products' && (<ProductManagement />)}
        </div>
    </div>
  )
}
