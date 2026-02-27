import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Radio, ListItemText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PerformanceFilterBar = ({ filters }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    const handleSegmentClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setOpenIndex(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenIndex(null);
    };

    const handleSelect = (filter, value) => {
        filter.onChange(filter.label, value);
        handleClose();
    };

    const currentFilter = openIndex !== null ? filters[openIndex] : null;

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #D9E1E7',
                    overflow: 'hidden',
                }}
            >
                {filters.map((filter, index) => (
                    <Box
                        key={filter.label}
                        onClick={(e) => handleSegmentClick(e, index)}
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 12px',
                            gap: '40px',
                            cursor: 'pointer',
                            borderRight: index < filters.length - 1 ? '1px solid #D9E1E7' : 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                            <Typography sx={{ fontSize: 12, color: '#667F93', fontWeight: 400, flexShrink: 0 }}>
                                {filter.label}:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: '#1A2025',
                                    fontWeight: 400,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {filter.value || 'All'}
                            </Typography>
                        </Box>
                        <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#1A2025', flexShrink: 0 }} />
                    </Box>
                ))}
            </Box>

            {currentFilter && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            marginTop: 1,
                            borderRadius: '10px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #D9E1E7',
                            minWidth: 160,
                        },
                    }}
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                >
                    <MenuItem
                        onClick={() => handleSelect(currentFilter, '')}
                        sx={{
                            padding: '8px 16px',
                            '& .MuiListItemText-root span': { fontSize: 14, color: '#1f1f1f' },
                        }}
                    >
                        <Radio
                            checked={!currentFilter.value}
                            size="small"
                            sx={{ color: '#D9E1E7', '&.Mui-checked': { color: '#1f36c7' } }}
                        />
                        <ListItemText primary="All" />
                    </MenuItem>
                    {(currentFilter.options || []).map((option) => (
                        <MenuItem
                            key={option}
                            onClick={() => handleSelect(currentFilter, option)}
                            sx={{
                                padding: '8px 16px',
                                '& .MuiListItemText-root span': { fontSize: 14, color: '#1f1f1f' },
                            }}
                        >
                            <Radio
                                checked={currentFilter.value === option}
                                size="small"
                                sx={{ color: '#D9E1E7', '&.Mui-checked': { color: '#1f36c7' } }}
                            />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </>
    );
};

export default PerformanceFilterBar;
