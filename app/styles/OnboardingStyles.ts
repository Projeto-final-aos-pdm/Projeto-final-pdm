import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#1C1C1E', 
  textPrimary: '#FFFFFF',
  textSecondary: '#AEAEB2',
  accent: '#AFFF00', 
  buttonText: '#1C1C1E',
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
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  textBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  

  buttonSpacing: { 
    marginTop: 20, 
  },
});

export default styles;