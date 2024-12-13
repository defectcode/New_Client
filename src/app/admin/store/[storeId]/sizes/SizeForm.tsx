'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form-elements/Form';
import { Input } from '@/components/ui/form-elements/Input';

import styles from '../Store.module.scss';
import { useCreateSize } from '@/hooks/queries/sizes/useCreateSize';

interface SizeFormValues {
  title: string;
  value: string;
}

export function SizeForm({ size }: { size?: { id: string; title: string; value: string } }) {
  const { createSize, isLoadingCreate } = useCreateSize();

  const title = size ? 'Edit size' : 'Create size';
  const action = size ? 'Save' : 'Create';

  const form = useForm<SizeFormValues>({
    mode: 'onChange',
    defaultValues: {
      title: size?.title || '',
      value: size?.value || '',
    },
  });

  const onSubmit: SubmitHandler<SizeFormValues> = data => {
    createSize(data);
  };

  return (
    <div className={styles.wrapper}>
      <Heading title={title} description="Manage sizes in your store" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: 'Size title is required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[24px]">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter size title (e.g., M)"
                    disabled={isLoadingCreate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Value Field */}
          <FormField
            control={form.control}
            name="value"
            rules={{
              required: 'Size value is required',
              pattern: {
                value: /^\d+$/,
                message: 'Size value must be a number',
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[24px]">Value</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter size value (e.g., 32)"
                    disabled={isLoadingCreate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="primary" disabled={isLoadingCreate}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
