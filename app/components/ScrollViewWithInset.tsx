import { ScrollView, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = ScrollViewProps;

export const ScrollViewWithInsets = ({ children, ...rest }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 40,
      }}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};