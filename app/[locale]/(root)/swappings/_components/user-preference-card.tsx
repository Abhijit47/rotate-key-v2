import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getUserLocationPreference } from '@/lib/user-actions';

import { Separator } from '@/components/ui/separator';
import {
  LazySwappingFilterByType,
  LazySwappingFilterReset,
  LazySwappingsLimit,
  LazyUpdatePreferenceModal,
} from '.';

export default async function UserPreferenceCard() {
  const userPreferences = await getUserLocationPreference();

  if (!userPreferences.success) {
    return (
      <div className={'flex flex-col text-center items-center justify-center'}>
        <h2 className={'text-2xl font-bold mb-4'}>No Preferences mentiond</h2>
        <p className={'text-muted-foreground'}>
          There are no properties available for swapping at the moment. Please
          check back later.
        </p>
      </div>
    );
  }

  return (
    <section>
      <Card className={'gap-4 py-4'}>
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
          <CardDescription>
            Your current preferred swap location
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className={'flex items-center flex-wrap gap-4'}>
          <Badge variant={'outline'}>
            <span>City :</span> {userPreferences.preferences?.toLocation.city}
          </Badge>
          <Badge variant={'outline'}>
            <span>State :</span>
            {userPreferences.preferences?.toLocation.state}
          </Badge>
          <Badge variant={'outline'}>
            <span>Country :</span>
            {userPreferences.preferences?.toLocation.country}
          </Badge>
        </CardContent>

        <CardContent>
          <div className={'flex flex-wrap items-center justify-between gap-4'}>
            <LazyUpdatePreferenceModal
              preference={userPreferences.preferences}
            />
            <div className={'flex flex-wrap items-center gap-2'}>
              <LazySwappingFilterReset />
              <LazySwappingsLimit />
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardContent>
          <LazySwappingFilterByType />
        </CardContent>
      </Card>
    </section>
  );
}
