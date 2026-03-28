import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['base', 'prime', 'outline', 'link', 'custom'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Base: Story = {
  args: {
    children: 'Base button',
    variant: 'base',
  },
};

export const Prime: Story = {
  args: {
    children: 'Prime button',
    variant: 'prime',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline button',
    variant: 'outline',
  },
};

export const Link: Story = {
  args: {
    children: 'Link button',
    variant: 'link',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'prime',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    variant: 'prime',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full width button',
    variant: 'prime',
    fullWidth: true,
  },
};