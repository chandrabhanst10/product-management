import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CategoryData from "./CategoryData.json";

function Countrystate() {
  const [categoryId, setcategoryId] = useState("");
  const [company, setCompany] = useState([]);
  const [companyid, setCompanyid] = useState("");

  const handleCategory = (e) => {
    const getcategoryId = e.target.value;
    const getCompanydata = CategoryData.find(
      (category) => category.category_name === getcategoryId
    ).companies;
    setCompany(getCompanydata);
    setcategoryId(getcategoryId);
    //console.log(getcategoryId);
  };

  const handleCompany = (e) => {
    const companyid = e.target.value;
    //console.log(stateid);
    setCompanyid(companyid);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Get Country id" + categoryId + " And " + companyid);
  };

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="mt-3">
              Select Country and State from JSON file in React js
            </h3>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-3">
                <label className="form-label"> Country</label>
                <div className="text-dark">
                  <select
                    name="country"
                    className="form-control"
                    onChange={(e) => handleCategory(e)}
                  >
                    <option value="">--Select Country--</option>
                    {CategoryData.map((getCategory, index) => (
                      <option value={getCategory.category_name} key={index}>
                        {getCategory.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label"> State</label>
                <div className="text-dark">
                  <select
                    name="companies"
                    className="form-control"
                    onChange={(e) => handleCompany(e)}
                  >
                    <option value="">--Select company--</option>
                    {company.map((getCompany, index) => (
                      <option value={getCompany.company_name} key={index}>
                        {getCompany.company_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-2" style={{ padding: "9px" }}>
                <label className="form-label"> </label>
                <div className="text-dark">
                  <button name="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Countrystate;
