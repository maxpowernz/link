import { OnlineStatusContext } from '../hooks/useOnlineStatus';
import { useArgs } from '@storybook/addons';

export default function OnLineContextDecorator(Story: any) {
  const [args] = useArgs();

  return (
    <OnlineStatusContext.Provider value={args.online}>
      <Story />
    </OnlineStatusContext.Provider>
  );
}
