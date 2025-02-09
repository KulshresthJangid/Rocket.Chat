import { css } from '@rocket.chat/css-in-js';
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useToggle } from '@rocket.chat/fuselage-hooks';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';

const CodeMirrorBox = ({ label, children }: { label: ReactNode; children: ReactElement }) => {
	const t = useTranslation();
	const [fullScreen, toggleFullScreen] = useToggle(false);

	const fullScreenStyle = css`
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		display: flex;

		flex-direction: column;

		width: auto;
		height: auto;

		padding: 40px;

		align-items: stretch;
	`;

	return (
		<Box
			backgroundColor='light'
			className={['code-mirror-box', fullScreen && 'code-mirror-box-fullscreen', fullScreen && fullScreenStyle].filter(Boolean)}
		>
			{fullScreen && (
				<Box fontScale='p1' mbe={4}>
					{label}
				</Box>
			)}
			<Box display='flex' flexDirection='column' height='100%' role='code' aria-label={typeof label === 'string' ? label : undefined}>
				{children}
			</Box>
			<Box mbs={8}>
				<ButtonGroup>
					<Button primary onClick={(): void => toggleFullScreen()}>
						{fullScreen ? t('Exit_Full_Screen') : t('Full_Screen')}
					</Button>
				</ButtonGroup>
			</Box>
		</Box>
	);
};

export default CodeMirrorBox;
