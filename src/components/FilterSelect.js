import React, { useState } from 'react';
import {
    FormControl,
    Select,
    MenuItem,
    OutlinedInput,
    Radio,
    ListItemText,
    Typography,
} from '@mui/material';
import styles from './FilterSelect.module.css';

const FilterSelect = ({ label, options = [], value, onChange }) => {
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        onChange(label, event.target.value);
        setOpen(false);
    };

    return (
        <div className={styles.container}>
            <Typography
                className={styles.label}
                sx={{
                    fontSize: 12,
                    color: '#667F93',
                    fontWeight: 400,
                    marginLeft: '4px',
                }}
            >
                {label}
            </Typography>
            <FormControl fullWidth>
                <Select
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    value={value || ''}
                    onChange={handleChange}
                    displayEmpty
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (!selected) {
                            return <span style={{ color: '#9AA0A6' }}>All</span>;
                        }
                        return <span style={{ color: '#1A2025' }}>{selected}</span>;
                    }}
                    sx={{
                        height: 40,
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        fontSize: 14,
                        color: '#1A2025',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#D9E1E7',
                            borderRadius: '10px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1f36c7',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1f36c7',
                            borderWidth: '1px',
                        },
                        '& .MuiSelect-select': {
                            color: '#1A2025',
                            padding: '8px 14px',
                        },
                    }}
                    slotProps={{
                        input: {
                            sx: {
                                color: '#1A2025',
                                fontSize: 14,
                            },
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                marginTop: 1,
                                borderRadius: '10px',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            },
                        },
                    }}
                >
                    <MenuItem
                        value=""
                        sx={{
                            padding: '8px 16px',
                            '& .MuiListItemText-root span': {
                                fontSize: 14,
                                color: '#1f1f1f',
                            },
                        }}
                    >
                        <Radio
                            checked={!value}
                            size="small"
                            sx={{
                                color: '#D9E1E7',
                                '&.Mui-checked': {
                                    color: '#1f36c7',
                                },
                            }}
                        />
                        <ListItemText primary="All" />
                    </MenuItem>
                    {options.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            sx={{
                                padding: '8px 16px',
                                '& .MuiListItemText-root span': {
                                    fontSize: 14,
                                    color: '#1f1f1f',
                                },
                            }}
                        >
                            <Radio
                                checked={value === option}
                                size="small"
                                sx={{
                                    color: '#D9E1E7',
                                    '&.Mui-checked': {
                                        color: '#1f36c7',
                                    },
                                }}
                            />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default FilterSelect;
