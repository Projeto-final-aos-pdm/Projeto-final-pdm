import { StyleSheet } from 'react-native';

export const COLORS = {
  // Cores Base do Tema
  background: '#1C1C1E', 
  textPrimary: '#FFFFFF', 
  accent: '#AFFF00', 
  buttonText: '#1C1C1E', 

  textSecondary: '#AEAEB2', 
  textMuted: '#AEAEB2',     

  income: '#00C853',    
  expense: '#DC3545',  
  itemBackground: '#2C2C2E', 
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  illustrationContainer: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  buttonSpacing: { 
    marginTop: 20, 
  },
});

export default styles;