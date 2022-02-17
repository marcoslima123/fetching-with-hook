import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { Repository } from "./Repos"


export function Repo() {
  const params = useParams()
  const currentResitory = params['*'] as string

  const queryClient = useQueryClient()

  async function handleChangeRepositoryDescription() {


    const previusRepos = queryClient.getQueryData<Repository[]>('repos')

    if(previusRepos) {
      const nextRepos = previusRepos.map(repo => {
        if (repo.full_name == currentResitory) {
          return {...repo, description: 'Novo repo'}
        } else {
          return repo;
        }
      })

      queryClient.setQueryData('repos', nextRepos)
    }
  }

  return (
    <>
      <h1>{currentResitory}</h1>
      <button onClick={handleChangeRepositoryDescription}>Alterar</button>
    </>
  )
}
