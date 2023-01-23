import './list.scss'

export const List = ({data, listAllUsers}) => {
  const goToFullPage = async(e) => {
    const id = e.target.getAttribute("data-id");
    listAllUsers(id);
  }

    return (
        <tr>
          <td>
          <div class="shrink-0">
            <img className="h-16 w-16 object-cover rounded-full" src={data.avatar} alt="avatar" />
          </div>
          </td>
          <td onClick={goToFullPage} className="cursor-pointer" data-id={data._id}>{data.name}</td>
          <td>Онлайн</td>
          <td>{data.region}</td>
        </tr>
    )
}