import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CONNECT_PREFIX, COURSE_PREFIX, PUBLIC_PREFIX, MYLIST_PREFIX, MOVIE_LIST_PREFIX, VIEW_COURSE_PREFIX, UPLOAD_PREFIX, UPGRADE_PREFIX, VIEW_NOTIFY, COMING_SOON_PREFIX, NOT_FOUND_PREFIX, DETAIL_VIEW, VIEW_USER_PROFILE } from 'configs/app-config';
import Loader from 'components/loader';

export default function PublicPage() {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route exact path={PUBLIC_PREFIX} component={lazy(() => import('./landing'))} />
                {/* <Route path={PUBLIC_PREFIX + CONNECT_PREFIX} component={lazy(() => import('./wallet-connect'))} /> */}
                <Route exact path={PUBLIC_PREFIX + MOVIE_LIST_PREFIX + COURSE_PREFIX} component={lazy(() => import('./course'))} />
                <Route exact path={PUBLIC_PREFIX + MOVIE_LIST_PREFIX} component={lazy(() => import('./video-list'))} />
                <Route exact path={PUBLIC_PREFIX + DETAIL_VIEW} component={lazy(() => import('./view-detail'))} />
                <Route exact path={PUBLIC_PREFIX + MYLIST_PREFIX + VIEW_USER_PROFILE} component={lazy(() => import('./my-list'))} />
                <Route exact path={PUBLIC_PREFIX + VIEW_COURSE_PREFIX} component={lazy(() => import('./view-video'))} />
                <Route exact path={PUBLIC_PREFIX + UPLOAD_PREFIX} component={lazy(() => import('./upload-video'))} />
                <Route exact path={PUBLIC_PREFIX + UPGRADE_PREFIX} component={lazy(() => import('./upgrade-plan'))} />
                <Route exact path={PUBLIC_PREFIX + VIEW_NOTIFY} component={lazy(() => import('./notifications'))} />
                <Route exact path={PUBLIC_PREFIX + COMING_SOON_PREFIX} component={lazy(() => import('./comming-soon'))} />
            </Switch>
        </Suspense>

    )
}