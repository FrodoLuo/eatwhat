import { Subject, Subscription, PartialObserver } from 'rxjs';

export function withSubscriber<T>(subject: Subject<T>, subscriber: (subject: Subject<T>) => any): Subject<T> {
    subscriber(subject);
    return subject;
}
