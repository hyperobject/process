import React from 'react'
import { Commit } from './commitNode';

export interface AppContextInterface {
    repoName: string,
    repoOwner: string,
    branch: string,
    currentTab: number,
    currentCommit?: Commit | null,
    setCommit: (commit: Commit | null) => void,
    setTab: (tab: number) => void,
    setRepo: (owner: string, name: string) => void
}

const ctxt = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctxt.Provider;

export const AppContextConsumer = ctxt.Consumer;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// export function withAppContext<
//   P extends { appContext?: AppContextInterface },
//   R = Omit<P, 'appContext'>
//   >(
//   Component: React.ComponentClass<P> | React.StatelessComponent<P>
//   ): React.SFC<R> {
//   return function BoundComponent(props: R) {
//     return (
//       <AppContextConsumer>
//         {value => <React.Component {...props} appContext={value} />}
//       </AppContextConsumer>
//     );
//   };
// }

export const withAppContext = <P extends {}>(Component: React.ComponentType<P>) =>
  class WithContext extends React.PureComponent<P> {
    render() {
      return (
        <AppContextConsumer>
          {(context: AppContextInterface | null ) => {
          return(<Component {...this.props} appContext={context} />)
          }}
        </AppContextConsumer>
      );
    }
  };