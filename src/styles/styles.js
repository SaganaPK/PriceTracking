import { styled } from '@mui/system';

const RootContainer = styled('div')({
  padding: '16px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const List = styled('ul')({
  listStyleType: 'none',
  padding: 0,
});

const ListItem = styled('li')({
  marginBottom: '8px',
  padding: '8px',
  backgroundColor: '#fff',
  borderRadius: '4px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
});

export { RootContainer, List, ListItem };
