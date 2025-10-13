'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  // DialogClose,
  // DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { updatePreferences } from '@/lib/user-actions';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Loader2 } from 'lucide-react';
import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// import { toast } from 'sonner';
// import { z } from 'zod';
import { LazyUpdatePreferenceForm } from '.';

// const updatePreferenceFormSchema = z.object({
//   country: z.string().min(2, { message: 'Country is required' }),
//   state: z.string().min(2, { message: 'State is required' }),
//   city: z.string().min(2, { message: 'City is required' }),
// });

// type updatePreferenceFormValues = z.infer<typeof updatePreferenceFormSchema>;

/*
{
  "toLocation": {
    "city": "Lake Sydneyshire",
    "state": "Virginia",
    "country": "Azerbaijan"
  },
  "fromLocation": {
    "city": "Virgiehaven",
    "state": "California",
    "country": "Mayotte"
  }
}
*/

export default function UpdatePreferenceModal({
  preference,
}: {
  preference: PreferencesType | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  // const form = useForm<updatePreferenceFormValues>({
  //   resolver: zodResolver(updatePreferenceFormSchema),
  //   defaultValues: {
  //     country: preference?.toLocation.country || '',
  //     state: preference?.toLocation.state || '',
  //     city: preference?.toLocation.city || '',
  //   },
  //   mode: 'onChange',
  // });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // 2. Define a submit handler.
  // function onSubmit(values: updatePreferenceFormValues) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.

  //   const formData = new FormData();
  //   formData.append('country', values.country);
  //   formData.append('state', values.state);
  //   formData.append('city', values.city);

  //   startTransition(async () => {
  //     const result = await updatePreferences(formData);
  //     if (!result.success) {
  //       toast.error(result.error || 'Failed to update preference');
  //       return;
  //     }
  //     toast.success('Preference updated successfully');
  //     form.reset();
  //     toggleModal();
  //     return;
  //   });
  // }

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button size={'sm'}>Update Preferences</Button>
      </DialogTrigger>

      <LazyUpdatePreferenceForm
        preference={preference}
        onToggle={toggleModal}
      />
    </Dialog>
  );
}
