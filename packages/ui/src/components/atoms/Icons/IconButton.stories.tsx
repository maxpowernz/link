import React, { FunctionComponent, SVGAttributes } from 'react';
import { Button as DaisyButton } from 'react-daisyui';
import { ComponentMeta, ComponentStory } from '@storybook/react';
// 18x18
import ArrowLeftIcon from '../../../assets/icons/18x18/arrow-left.svg';
import BoxIcon from '../../../assets/icons/18x18/box.svg';
import CalendarIcon from '../../../assets/icons/18x18/calendar.svg';
import CaretIcon from '../../../assets/icons/18x18/caret.svg';
import CheckboxIcon from '../../../assets/icons/18x18/check-box.svg';
import CheckCircleIcon from '../../../assets/icons/18x18/check-circle.svg';
import CircleIcon from '../../../assets/icons/18x18/circle.svg';
import CloseIcon from '../../../assets/icons/18x18/close.svg';
import DragIcon from '../../../assets/icons/18x18/drag.svg';
import DuplicateIcon from '../../../assets/icons/18x18/duplicate.svg';
import File18Icon from '../../../assets/icons/18x18/file.svg';
import GridIcon from '../../../assets/icons/18x18/grid.svg';
import HalfCirlceIcon from '../../../assets/icons/18x18/half-circle.svg';
import InvalidIcon from '../../../assets/icons/18x18/invalid.svg';
import HamburgerIcon from '../../../assets/icons/18x18/hamburger.svg';
import LocationIcon from '../../../assets/icons/18x18/location.svg';
import MinusCircleIcon from '../../../assets/icons/18x18/minus-circle.svg';
import NewApplicationIcon from '../../../assets/icons/18x18/new-application.svg';
import NewReferralIcon from '../../../assets/icons/18x18/new-referral.svg';
import SaveIcon from '../../../assets/icons/18x18/save.svg';
import PlusIcon from '../../../assets/icons/18x18/plus.svg';
import SearchIcon from '../../../assets/icons/18x18/search.svg';
import StackIcon from '../../../assets/icons/18x18/stack.svg';
import SyncIcon from '../../../assets/icons/18x18/sync.svg';
import ToggledIcon from '../../../assets/icons/18x18/toggled.svg';
import UncheckedIcon from '../../../assets/icons/18x18/unchecked.svg';
import UploadIcon from '../../../assets/icons/18x18/upload.svg';
import WifiIcon from '../../../assets/icons/18x18/wifi.svg';
// 24x24
import AttachmentIcon from '../../../assets/icons/24x24/attachment.svg';
import CalculatorIcon from '../../../assets/icons/24x24/calculator.svg';
import CameraIcon from '../../../assets/icons/24x24/camera.svg';
import FilesIcon from '../../../assets/icons/24x24/files.svg';
import HomeIcon from '../../../assets/icons/24x24/home.svg';
import NoteIcon from '../../../assets/icons/24x24/note.svg';
import OfflineIcon from '../../../assets/icons/24x24/offline.svg';
import OnlineIcon from '../../../assets/icons/24x24/online.svg';
import PencilIcon from '../../../assets/icons/24x24/pencil.svg';
import SettingsIcon from '../../../assets/icons/24x24/settings.svg';
import UserIcon from '../../../assets/icons/24x24/user.svg';
import UsersIcon from '../../../assets/icons/24x24/users.svg';
// 30x30
import FileIcon from '../../../assets/icons/30x30/file.svg';
// 42x42
import AddCircleIcon from '../../../assets/icons/42x42/add-circle.svg';
import AddFileIcon from '../../../assets/icons/42x42/add-file.svg';
import AddUserIcon from '../../../assets/icons/42x42/add-user.svg';

const icons: [string, FunctionComponent<SVGAttributes<SVGElement>>[]][] = [
  [
    '18x18',
    [
      ArrowLeftIcon,
      BoxIcon,
      CalendarIcon,
      CaretIcon,
      CheckboxIcon,
      CheckCircleIcon,
      CircleIcon,
      CloseIcon,
      DragIcon,
      DuplicateIcon,
      File18Icon,
      GridIcon,
      HalfCirlceIcon,
      HamburgerIcon,
      InvalidIcon,
      LocationIcon,
      MinusCircleIcon,
      NewApplicationIcon,
      NewReferralIcon,
      SaveIcon,
      PlusIcon,
      SearchIcon,
      StackIcon,
      SyncIcon,
      ToggledIcon,
      UncheckedIcon,
      UploadIcon,
      WifiIcon,
    ],
  ],
  [
    '24x24',
    [
      AttachmentIcon,
      CalculatorIcon,
      CameraIcon,
      FilesIcon,
      HomeIcon,
      NoteIcon,
      OfflineIcon,
      OnlineIcon,
      PencilIcon,
      SettingsIcon,
      UserIcon,
      UsersIcon,
    ],
  ],
  ['30x30', [FileIcon]],
  ['42x42', [AddCircleIcon, AddFileIcon, AddUserIcon]],
];

export default {
  title: 'Atoms/Icons/IconButtons',
  component: DaisyButton,
  parameters: {},
} as ComponentMeta<typeof DaisyButton>;

const Template: ComponentStory<typeof DaisyButton> = (args) => {
  return (
    <div style={{ display: 'flex' }}>
      {icons.map((iconGroup, groupIdx) => {
        return (
          <div key={groupIdx}>
            <b>{iconGroup[0]}</b>
            {iconGroup[1].map((Icon, lineIdx) => (
              <div key={lineIdx} className="w-full flex justify-start items-center my-2">
                <div className="mx-2 w-6">{lineIdx + 1}</div>
                <DaisyButton {...args} shape="circle" startIcon={<Icon aria-label="svg-icon" />} className="mx-2"></DaisyButton>
                <DaisyButton {...args} shape="square" startIcon={<Icon aria-label="svg-icon" />} className="mx-2"></DaisyButton>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
};

export const Error = Template.bind({});
Error.args = {
  color: 'error',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
