import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

export default function SingleSelectDropdown({ options, selected, onSelect, placeholder }) {
  return (
    <FormControl fullWidth size="small">
      <Select
        displayEmpty
        value={selected || ''}
        onChange={(e) => onSelect(e.target.value)}
        variant="outlined"
        sx={{
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          fontSize: '14px',
          color: selected ? '#09090b' : '#94a3b8',
          fontWeight: selected ? 500 : 400,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e2e8f0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cbd5e1',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#09090b',
            borderWidth: '1px',
          },
          '& .MuiSelect-select': {
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiSvgIcon-root': {
            color: '#64748b',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: '8px',
              marginTop: '6px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
              maxHeight: 260,
              '& .MuiMenuItem-root': {
                fontSize: '14px',
                padding: '10px 16px',
                color: '#09090b',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                },
                '&.Mui-selected': {
                  backgroundColor: '#f1f5f9',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                  },
                },
              },
            },
          },
        }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <span style={{ color: '#94a3b8' }}>{placeholder}</span>
          </MenuItem>
        )}
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
