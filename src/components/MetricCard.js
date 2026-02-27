import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip, IconButton } from '@mui/material';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import styles from './MetricCard.module.css';

const MetricCard = ({ title, value, delta, infoText = "" }) => {
    const isPositive = delta >= 0;
    const deltaValue = Math.abs(delta);
    
    const badgeBg = isPositive ? '#00B1901A' : '#FFEEED';
    const badgeColor = isPositive ? '#09967C' : '#D54C48';
    const badgeBorder = isPositive ? '1px solid #00B190' : '1px solid #FFBBB9';
    const sign = isPositive ? '+' : '-';

    return (
        <Card className={styles.card}
        style={{
            boxShadow: 'none',
            borderRadius: '8px'
        }}
        >
            <CardContent className={styles.cardContent}>
                <Box className={styles.header}>
                    <Typography className={styles.title}>{title}</Typography>
                    <Tooltip title={infoText} arrow>
                        <IconButton size="small" className={styles.infoIcon}>
                            <IoMdInformationCircleOutline />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box className={styles.body}>
                    <Typography className={styles.value}>
                        {value}<span className={styles.percent}>%</span>
                    </Typography>
                    
                    <Box className={styles.badgeContainer}>
                        <Typography className={styles.ytdLabel}
                        style={{
                            marginBottom: '6px'
                        }}
                        >YTD Δ</Typography>
                        <Box 
                            className={styles.badge}
                            style={{ 
                                backgroundColor: badgeBg, 
                                color: badgeColor,
                                border: badgeBorder
                            }}
                        >
                            {sign}{deltaValue}%
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
