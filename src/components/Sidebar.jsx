export default function Sidebar({ sidebarItems }) {
    return (
      <div className="drawer lg:drawer-open overflow-hidden bg-slate-100">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-auto p-4">
            <li><a>Employeeeeee</a></li>
            <li><a>Company</a></li>
            <li><a>Tax Information</a></li>
            <li><a>Banking</a></li>
            <li><a>Indicators</a></li>
            <li><a>Reference</a></li>
            <li><a>Dates</a></li>
            <li><a>Amounts</a></li>
          </ul>
        </div>
      </div>
    )
  }