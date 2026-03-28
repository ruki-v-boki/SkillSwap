import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { LogoUI } from './Logo';

const meta: Meta<typeof LogoUI> = {
  title: 'Components/LogoUI',
  component: LogoUI,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    to: {
      control: 'text',
      description: 'Ссылка для логотипа',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoUI>;

// Базовая история
export const Default: Story = {
  args: {
    to: '/home',
  },
};

// С другой ссылкой
export const CustomLink: Story = {
  args: {
    to: '/custom-page',
  },
};