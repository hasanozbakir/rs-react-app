import { http, HttpResponse } from 'msw';
import { API_URL } from '../utils/constants';
import { allPeopleResults, testItemsPerPage } from './testData';

const handlers = [
  http.get(`${API_URL}people`, ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');

    const filteredResults = allPeopleResults.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (page - 1) * testItemsPerPage;
    const endIndex = startIndex + testItemsPerPage;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    const nextPage = page + 1;
    const previousPage = page - 1;
    const nextUrl =
      endIndex > filteredResults.length
        ? `${API_URL}/people/?search=${search}&page=${nextPage}`
        : null;
    const previousUrl =
      startIndex < 0
        ? `${API_URL}/people/?search=${search}&page=${previousPage}`
        : null;

    return HttpResponse.json({
      count: filteredResults.length,
      next: nextUrl,
      previous: previousUrl,
      results: paginatedResults,
    });
  }),

  http.get(`${API_URL}person/:id`, ({ params }) => {
    const { id } = params;
    const idString = typeof id === 'string' ? id : '';
    const person = allPeopleResults.find((p) =>
      p.url.endsWith(`/people/${idString}/`)
    );

    if (person) {
      return HttpResponse.json(person);
    } else {
      return new HttpResponse(null, { status: 404 });
    }
  }),
];

export { handlers };
