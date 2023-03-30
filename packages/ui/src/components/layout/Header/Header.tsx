import React, { useId } from 'react';
import { useOnlineContext } from '../../../hooks/useOnlineStatus';
import AvatarImage from '../../../assets/img/pexels-linkedin-sales-navigator-2182970@2x.png';
import classnames from 'classnames';
import HeaderBackground from '../../../assets/img/header-bg@1x.png';
import IconArrowLeft from '../../../assets/icons/18x18/arrow-left.svg';
import { InlineButton } from '../../atoms/Button/InlineButton';
import { LoginButton } from '../../atoms/Button/LoginButton';
import { RoundButton } from '../../atoms/Button/RoundButton';
import Logo from '../../../assets/brand/fmg-logo.svg';
import { ButtonsAcquisition, ButtonsNewApplication, MobileButtons, OnlineStatusButton } from './HeaderButtons';

export enum HeaderType {
  acquisition = 'acquisition',
  newApplication = 'newApplication',
}

export type HeaderProps = {
  headerType: keyof typeof HeaderType;
  accountName: string;
  primaryContact: string;
};

export function Header({ headerType, accountName, primaryContact }: HeaderProps) {
  const isOnline = useOnlineContext();
  const componentId = useId();

  const isAcquisition = headerType === HeaderType.acquisition;
  const isNewApplication = headerType === HeaderType.newApplication;

  console.log('/' + AvatarImage);

  return (
    <>
      <div
        id={componentId}
        data-testid={`header-${headerType}`}
        className={classnames(
          `flex items-center justify-between py-3 pr-4.5 max-h-[72px] min-h-[72px] bg-fmg-green bg-no-repeat bg-header-mobile md:bg-header-desktop`,
          {
            'pl-4.5': isNewApplication,
            'pl-7.5': isAcquisition,
          }
        )}
        style={{
          backgroundImage: `url(${HeaderBackground.src})`,
        }}
      >
        <Logo data-testid="logo" width="82px" height="24px" className={classnames({ hidden: isNewApplication, flex: isAcquisition })} />
        <div data-testid="header-back-button" className={classnames('flex items-center', { hidden: isAcquisition })}>
          <div className="hidden lg:block">
            <RoundButton aria-label="Back Button" startIcon={<IconArrowLeft />} />
          </div>
          <div className="lg:hidden">
            <InlineButton color="secondary-light" aria-label="Back Button" startIcon={<IconArrowLeft />}></InlineButton>
          </div>
        </div>
        <div className="flex-1 overflow-hidden ml-3 md:ml-4.5 text-white">
          {isNewApplication && (
            <>
              <p data-testid="header-account-name" className="font-medium text-base lg:text-xl tracking-[-.02px] leading-tight truncate">
                {accountName}
              </p>
              <p data-testid="header-primary-contact" className="text-base opacity-75 leading-tight truncate">
                {primaryContact}
              </p>
            </>
          )}
        </div>
        <OnlineStatusButton data-testid="header-online-status-icon" isOnline={isOnline} className={classnames('hidden md:flex ml-4.5')} />
        {isAcquisition && (
          <div data-testid="header-acquisition-buttons" className="hidden md:flex items-center">
            <ButtonsAcquisition />
          </div>
        )}
        {isNewApplication && (
          <div data-testid="header-new-application-buttons" className="hidden md:flex items-center">
            <ButtonsNewApplication />
          </div>
        )}
        {/*<LoginButton*/}
        {/*  data-testid="header-login-button"*/}
        {/*  className={classnames('hidden md:flex ml-7.5')}*/}
        {/*  aria-label="Login"*/}
        {/*  imageUrl={'/' + AvatarImage}*/}
        {/*/>*/}
        <div data-testid="header-mobile-icons" className="md:hidden flex items-center gap-1.5 ml-3">
          <OnlineStatusButton data-testid="online-status-mobile" isOnline={isOnline} isMobile />
          <MobileButtons />
        </div>
      </div>

      {!isOnline && (
        <div data-testid="header-offline-message" className="max-h-6 bg-warning-light text-white text-center py-1 text-xs">
          No internet connection. Online features unavailable.
        </div>
      )}
    </>
  );
}
