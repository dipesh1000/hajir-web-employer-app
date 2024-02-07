
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanel } from '@mui/lab';
import styled from 'styled-components';
import SimplePaper from '../PlansPaper/PlansPaper';
import Monthly from '../monthly/monthly';

// Styled components for the custom styles
const Top = styled.div`
  height: 120px;
`;

const Content = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  height: 340px;
  gap: 5px;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
`;

// Styled component for the custom TabPanel
const TabPanelStyled = styled.div`
  display: ${({ value, index }) => (value === index ? 'block' : 'none')};
`;

// CustomTabPanel component with styled-components
export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <TabPanelStyled value={value} index={index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </TabPanelStyled>
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

// BasicTabs component with styled-components
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderColor: 'divider',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginLeft: '250px',
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Monthly" {...a11yProps(0)} sx={{ width: '600px', borderColor: 'gray',  color: 'black' }} />
          <Tab
            label="Yearly, Save 30%."
            {...a11yProps(1)}
            sx={{ width: '600px', borderRadius: '5%', borderColor: 'gray', backgroundColor: 'white', color: 'black' }}
          />
        </Tabs>
      </Box>

      {/* CustomTabPanel for Monthly content, only rendered when the value is 0 */}
      <CustomTabPanel value={value} index={0}>
        <Monthly />
      </CustomTabPanel>

      {/* CustomTabPanel for Yearly content, only rendered when the value is 1 */}
      <CustomTabPanel value={value} index={1}>
        <SimplePaper />
      </CustomTabPanel>
    </Box>
  );
}

