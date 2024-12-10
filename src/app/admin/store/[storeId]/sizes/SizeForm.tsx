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

export function SizeForm({ size }: { size?: { id: string; value: string } }) {
  const { createSize, isLoadingCreate } = useCreateSize();

  const title = size ? 'Edit size' : 'Create size';
  const action = size ? 'Save' : 'Create';

  const form = useForm<{ value: string }>({
    mode: 'onChange',
    defaultValues: {
      value: size?.value || '',
    },
  });

  const onSubmit: SubmitHandler<{ value: string }> = data => {
    createSize(data);
  };

  return (
    <div className={styles.wrapper}>
      <Heading title={title} description="Manage sizes in your store" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="value"
            rules={{
              required: 'Size value is required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter size value"
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
  )
}