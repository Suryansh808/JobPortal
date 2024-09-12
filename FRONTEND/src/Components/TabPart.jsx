import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box  sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabPart() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  sx={{ width: '100%' }}>
      <Box  sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs  value={value} onChange={handleChange}>
          <Tab label="Impact" {...a11yProps(0)} />
          <Tab label="Support" {...a11yProps(1)} />
          <Tab label="Progress" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel  value={value} index={0}>
      <div className='flex max-[600px]:flex-col'>
        <div className="image rounded-lg overflow-hidden w-1/2 max-[600px]:w-full ">
          <img src="https://i.pinimg.com/564x/5e/eb/4d/5eeb4ddd2338947a674e0c60da26cf14.jpg" alt="" className='w-full h-full' />
        </div>
        <div className="content px-2 py-1 rounded-lg w-1/2 max-[600px]:w-full">
          <h1 className="text-3xl font-bold">Impact</h1>
          <p className="font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            tellus non nunc luctus ultricies. Sed ut lacinia nunc.
            </p>
        </div>
      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className=' flex max-[600px]:flex-col'>
          <div className="image rounded-lg overflow-hidden w-1/2  max-[600px]:w-full">
            <img src="https://i.pinimg.com/564x/5b/3b/ed/5b3bed4f19efbe8f47b85ac9bae4d0ce.jpg" alt="" className='w-full h-full' />
          </div>
          <div className="content px-2 py-1 rounded-lg w-1/2 max-[600px]:w-full">
            <h1 className="text-3xl font-bold">Support</h1>
            <p className="font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              tellus non nunc luctus ultricies. Sed ut lacinia nunc.
              </p>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className='flex max-[600px]:flex-col'>
          <div className="image rounded-lg overflow-hidden w-1/2  max-[600px]:w-full">
            <img src="https://i.pinimg.com/564x/34/8a/01/348a0158be0dedceb04846b28cdfe962.jpg" alt="" className='w-full h-full' />
          </div>
          <div className="content px-2 py-1 rounded-lg w-1/2 max-[600px]:w-full">
            <h1 className="text-3xl font-bold">Progress</h1>
            <p className="font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              tellus non nunc luctus ultricies. Sed ut lacinia nunc.
              </p>
          </div>
        </div>
      </CustomTabPanel>
    </Box>
  );
}
