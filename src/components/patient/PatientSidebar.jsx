import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Badge,
  Tooltip,
  Avatar,
  useTheme
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import ScienceIcon from '@mui/icons-material/Science';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EmergencyIcon from '@mui/icons-material/ReportProblem';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'; // Loyalty Rewards
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Cards & Billing

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
  { label: 'Find a Doctor', icon: <LocalHospitalIcon />, key: 'find-doctor' },
  { label: 'Appointments', icon: <EventNoteIcon />, key: 'appointments' },
  {
    label: 'Wallet, Payments & Cards',
    icon: <AccountBalanceWalletIcon />,
    key: 'wallet',
    tooltip: 'Manage your wallet, payments, and saved cards',
  },
  { label: 'Medical Records', icon: <DescriptionIcon />, key: 'records' },
  { label: 'Messages & Chats', icon: <ChatIcon />, key: 'messages', badge: true },
  { label: 'Book A Test', icon: <ScienceIcon />, key: 'book-test' },
  { label: 'Pharmacies', icon: <LocalPharmacyIcon />, key: 'pharmacies' },
  { label: 'Insights', icon: <InsightsIcon />, key: 'insights' },
  {
    label: 'Loyalty Rewards',
    icon: <CardGiftcardIcon />,
    key: 'loyalty',
    tooltip: 'Earn points for every consultation, test, or purchase',
  },
  {
    label: 'Cards & Billing',
    icon: <CreditCardIcon />,
    key: 'cards',
    tooltip: 'Manage your saved cards and billing details',
  },
];

const settingsItems = [
  { label: 'Settings', icon: <SettingsIcon />, key: 'settings' },
  { label: 'Logout', icon: <LogoutIcon color="error" />, key: 'logout', danger: true },
];

const PatientSidebar = ({
  activeKey,
  onMenuClick,
  unreadMessages = 0,
  onEmergencyClick,
  user
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: `1.5px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
        boxShadow: '2px 0 12px rgba(80,120,200,0.06)',
      }}
    >
      {/* Top: Logo & User */}
      <Box sx={{ p: 3, pb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={user?.avatar} sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          {user?.firstName?.[0] || 'P'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {user?.firstName ? `Hi, ${user.firstName}` : 'Patient'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {/* Main Menu */}
      <List sx={{ flex: 1, py: 1 }}>
        {menuItems.map(item => (
          <Tooltip
            key={item.key}
            title={item.tooltip || ''}
            placement="right"
            arrow
            disableHoverListener={!item.tooltip}
          >
            <ListItemButton
              selected={activeKey === item.key}
              onClick={() => onMenuClick(item.key)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: item.danger ? 'error.main' : 'inherit',
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  fontWeight: 700,
                },
              }}
            >
              <ListItemIcon>
                {item.badge ? (
                  <Badge color="error" badgeContent={unreadMessages} invisible={unreadMessages === 0}>
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      <Divider />
      {/* Settings & Logout */}
      <List sx={{ py: 0 }}>
        {settingsItems.map(item => (
          <ListItemButton
            key={item.key}
            onClick={() => onMenuClick(item.key)}
            sx={{
              borderRadius: 2,
              color: item.danger ? 'error.main' : 'inherit',
              mb: 0.5,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      {/* Emergency Button */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Tooltip title="Call emergency doctor or ambulance">
          <ListItemButton
            sx={{
              bgcolor: 'error.main',
              color: '#fff',
              borderRadius: 2,
              mt: 1,
              '&:hover': { bgcolor: 'error.dark' },
              justifyContent: 'center',
            }}
            onClick={onEmergencyClick}
          >
            <EmergencyIcon sx={{ mr: 1 }} />
            <Typography fontWeight={700}>SOS</Typography>
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default PatientSidebar;