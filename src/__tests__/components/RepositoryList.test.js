import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 2,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'cursor2',
          startCursor: 'cursor1',
        },
        edges: [
          {
            node: {
              id: 'repo1',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'cursor1',
          },
          {
            node: {
              id: 'repo2',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'cursor2',
          },
        ],
      };

      const { getAllByText } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      // Check names
      expect(getAllByText('jaredpalmer/formik')).toHaveLength(1);
      expect(getAllByText('async-library/react-async')).toHaveLength(1);

      // Check descriptions
      expect(getAllByText('Build forms in React, without the tears')).toHaveLength(1);
      expect(getAllByText('Flexible promise-based React data loader')).toHaveLength(1);

      // Check languages
      expect(getAllByText('TypeScript')).toHaveLength(1);
      expect(getAllByText('JavaScript')).toHaveLength(1);

      // Check forks count (formatted)
      expect(getAllByText('1.6k Forks')).toHaveLength(1);
      expect(getAllByText('69 Forks')).toHaveLength(1);

      // Check stargazers count (formatted)
      expect(getAllByText('21.9k Stars')).toHaveLength(1);
      expect(getAllByText('1.8k Stars')).toHaveLength(1);

      // Check rating average
      expect(getAllByText('88 Rating')).toHaveLength(1);
      expect(getAllByText('72 Rating')).toHaveLength(1);

      // Check review count
      expect(getAllByText('3 Reviews')).toHaveLength(2);
    });
  });
}); 