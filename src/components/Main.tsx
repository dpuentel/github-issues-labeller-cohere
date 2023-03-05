import { AuthProvider } from '../context/auth'
import { IssueProvider } from '../context/issue'
import { IssuesProvider } from '../context/issues'
import { ErrorContainer } from './ErrorContainer'
import { IssueModal } from './IssueModal'
import { IssuesLists } from './IssuesLists'
import { Loader } from './loader/Loader'
import { SearchRepo } from './SearchRepo'

export function Main () {
	return (
		<AuthProvider>
			<IssueProvider>
				<IssuesProvider>
					<IssueModal />
					<SearchRepo label='The Github URL:' placeholder='https://github.com/pnpm/pnpm' />
					<Loader />
					<ErrorContainer />
					<IssuesLists />
				</IssuesProvider>
			</IssueProvider>
		</AuthProvider>
	)
}
