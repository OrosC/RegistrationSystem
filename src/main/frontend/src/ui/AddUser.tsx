import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Wrapper from "./Wrapper";
import {Address} from "../interfaces/address";


const AddUser = () => {
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [firstName, setFirstName ]= useState('');
    const [lastName, setLastName ] = useState('');
    const [password, setPassword ]= useState('');
    const [address, setAddress] = useState({} as Address);
    const [gender, setGender] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [likes, setLikes] = useState("");
    const [token, setToken] = useState("");


    const submit = async (e:SyntheticEvent) => {
          e.preventDefault();

        const response = await fetch('http://172.17.0.1:8080/api/v1/registration', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              mode: 'no-cors',
              body:JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  imageUrl: image,
                  gender: gender,
              })
          });

        const data = await response.json();
        setToken(data.token);
        setEmail(data.email);
        console.log(data);
        setRedirect(true);
    }

    if (redirect) {
      return <Redirect  to={'/app/confirm'}/>
    }


    return (
        <Wrapper>
            <section>
    <div className="py-5 text-center">
      {/* <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
      <h2>Add a new user</h2> */}
    </div>
      
    <div className="row g-5 float-end">
      <div className="col-md-4 col-lg-3 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Preview</span>
          <span className="badge bg-primary rounded-pill">{likes}</span>
        </h4>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-sm">
              <h6 className="my-1">User profile picture </h6> 
              <h6 className="text-muted my-1">{email}</h6>
          </li>
        
          <li className="list-group-item  lh-sm">
            <div>
              <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="true">
                                <title>User profile picture</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect> <text x="35%" y="50%" fill="#eceeef" >Thumbnail</text>
                                <image href={image} width="100%" height="100%"></image>
                                </svg>
                                </div>

              <div className="form-input-wide">
              <p></p>
              <input type="file" id="profilePic" name="profilePic" className="form-upload validate[upload]" data-imagevalidate="yes" data-file-accept="pdf, doc, docx, xls, csv, txt, rtf, html, zip, mp3, wma, mpg, flv, avi, jpg, jpeg, png, gif" data-file-maxsize="10240" data-file-minsize="0" data-file-limit="0" data-component="fileupload"/>
            </div>
            </div>
          </li>
        
          </ul>
      </div>
      <div className="col-md-4 col-lg-5">
        <h4 className="text-primary mb-3">User details</h4>
        <form className="needs-validation" noValidate onSubmit={submit}>
          <div className="row g-3">
          <div className="col">
              <input type="text" className="form-control" placeholder="First name" onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Last name" onChange={e => setLastName(e.target.value)} />
            </div>

            <div className="col-12">
              <div className="input-group has-validation">
                <input type="text" className="form-control" id="username" placeholder="Email" onChange={e => setEmail(e.target.value)} required/>
              <div className="invalid-feedback">
                  Username is required.
                </div>
              </div>
            </div>

            

            <div className="col-12">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select className="form-select" id="gender" placeholder="Gender" onChange={e => setGender(e.target.value)} required>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address </label>

        <article className="col-12 order-md-1 d-flex">
         
         <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="form-select d-block w-100" name="address[country]" id="country" data-component="country" aria-labelledby="label_3 sublabel_3_country">
                      <option value=""> Please Select </option>
                      <option value="United States"> United States </option>
                      <option value="Afghanistan"> Afghanistan </option>
                      <option value="Albania"> Albania </option>
                      <option value="Algeria"> Algeria </option>
                      <option value="American Samoa"> American Samoa </option>
                      <option value="Andorra"> Andorra </option>
                      <option value="Angola"> Angola </option>
                      <option value="Anguilla"> Anguilla </option>
                      <option value="Antigua and Barbuda"> Antigua and Barbuda </option>
                      <option value="Argentina"> Argentina </option>
                      <option value="Armenia"> Armenia </option>
                      <option value="Aruba"> Aruba </option>
                      <option value="Australia"> Australia </option>
                      <option value="Austria"> Austria </option>
                      <option value="Azerbaijan"> Azerbaijan </option>
                      <option value="The Bahamas"> The Bahamas </option>
                      <option value="Bahrain"> Bahrain </option>
                      <option value="Bangladesh"> Bangladesh </option>
                      <option value="Barbados"> Barbados </option>
                      <option value="Belarus"> Belarus </option>
                      <option value="Belgium"> Belgium </option>
                      <option value="Belize"> Belize </option>
                      <option value="Benin"> Benin </option>
                      <option value="Bermuda"> Bermuda </option>
                      <option value="Bhutan"> Bhutan </option>
                      <option value="Bolivia"> Bolivia </option>
                      <option value="Bosnia and Herzegovina"> Bosnia and Herzegovina </option>
                      <option value="Botswana"> Botswana </option>
                      <option value="Brazil"> Brazil </option>
                      <option value="Brunei"> Brunei </option>
                      <option value="Bulgaria"> Bulgaria </option>
                      <option value="Burkina Faso"> Burkina Faso </option>
                      <option value="Burundi"> Burundi </option>
                      <option value="Cambodia"> Cambodia </option>
                      <option value="Cameroon"> Cameroon </option>
                      <option value="Canada"> Canada </option>
                      <option value="Cape Verde"> Cape Verde </option>
                      <option value="Cayman Islands"> Cayman Islands </option>
                      <option value="Central African Republic"> Central African Republic </option>
                      <option value="Chad"> Chad </option>
                      <option value="Chile"> Chile </option>
                      <option value="China"> China </option>
                      <option value="Christmas Island"> Christmas Island </option>
                      <option value="Cocos (Keeling) Islands"> Cocos (Keeling) Islands </option>
                      <option value="Colombia"> Colombia </option>
                      <option value="Comoros"> Comoros </option>
                      <option value="Congo"> Congo </option>
                      <option value="Cook Islands"> Cook Islands </option>
                      <option value="Costa Rica"> Costa Rica </option>
                      <option value="Cote d'Ivoire"> Cote d'Ivoire </option>
                      <option value="Croatia"> Croatia </option>
                      <option value="Cuba"> Cuba </option>
                      <option value="Curacao"> Curacao </option>
                      <option value="Cyprus"> Cyprus </option>
                      <option value="Czech Republic"> Czech Republic </option>
                      <option value="Democratic Republic of the Congo"> Democratic Republic of the Congo </option>
                      <option value="Denmark"> Denmark </option>
                      <option value="Djibouti"> Djibouti </option>
                      <option value="Dominica"> Dominica </option>
                      <option value="Dominican Republic"> Dominican Republic </option>
                      <option value="Ecuador"> Ecuador </option>
                      <option value="Egypt"> Egypt </option>
                      <option value="El Salvador"> El Salvador </option>
                      <option value="Equatorial Guinea"> Equatorial Guinea </option>
                      <option value="Eritrea"> Eritrea </option>
                      <option value="Estonia"> Estonia </option>
                      <option value="Ethiopia"> Ethiopia </option>
                      <option value="Falkland Islands"> Falkland Islands </option>
                      <option value="Faroe Islands"> Faroe Islands </option>
                      <option value="Fiji"> Fiji </option>
                      <option value="Finland"> Finland </option>
                      <option value="France"> France </option>
                      <option value="French Polynesia"> French Polynesia </option>
                      <option value="Gabon"> Gabon </option>
                      <option value="The Gambia"> The Gambia </option>
                      <option value="Georgia"> Georgia </option>
                      <option value="Germany"> Germany </option>
                      <option value="Ghana"> Ghana </option>
                      <option value="Gibraltar"> Gibraltar </option>
                      <option value="Greece"> Greece </option>
                      <option value="Greenland"> Greenland </option>
                      <option value="Grenada"> Grenada </option>
                      <option value="Guadeloupe"> Guadeloupe </option>
                      <option value="Guam"> Guam </option>
                      <option value="Guatemala"> Guatemala </option>
                      <option value="Guernsey"> Guernsey </option>
                      <option value="Guinea"> Guinea </option>
                      <option value="Guinea-Bissau"> Guinea-Bissau </option>
                      <option value="Guyana"> Guyana </option>
                      <option value="Haiti"> Haiti </option>
                      <option value="Honduras"> Honduras </option>
                      <option value="Hong Kong"> Hong Kong </option>
                      <option value="Hungary"> Hungary </option>
                      <option value="Iceland"> Iceland </option>
                      <option value="India"> India </option>
                      <option value="Indonesia"> Indonesia </option>
                      <option value="Iran"> Iran </option>
                      <option value="Iraq"> Iraq </option>
                      <option value="Ireland"> Ireland </option>
                      <option value="Israel"> Israel </option>
                      <option value="Italy"> Italy </option>
                      <option value="Jamaica"> Jamaica </option>
                      <option value="Japan"> Japan </option>
                      <option value="Jersey"> Jersey </option>
                      <option value="Jordan"> Jordan </option>
                      <option value="Kazakhstan"> Kazakhstan </option>
                      <option value="Kenya"> Kenya </option>
                      <option value="Kiribati"> Kiribati </option>
                      <option value="North Korea"> North Korea </option>
                      <option value="South Korea"> South Korea </option>
                      <option value="Kosovo"> Kosovo </option>
                      <option value="Kuwait"> Kuwait </option>
                      <option value="Kyrgyzstan"> Kyrgyzstan </option>
                      <option value="Laos"> Laos </option>
                      <option value="Latvia"> Latvia </option>
                      <option value="Lebanon"> Lebanon </option>
                      <option value="Lesotho"> Lesotho </option>
                      <option value="Liberia"> Liberia </option>
                      <option value="Libya"> Libya </option>
                      <option value="Liechtenstein"> Liechtenstein </option>
                      <option value="Lithuania"> Lithuania </option>
                      <option value="Luxembourg"> Luxembourg </option>
                      <option value="Macau"> Macau </option>
                      <option value="Macedonia"> Macedonia </option>
                      <option value="Madagascar"> Madagascar </option>
                      <option value="Malawi"> Malawi </option>
                      <option value="Malaysia"> Malaysia </option>
                      <option value="Maldives"> Maldives </option>
                      <option value="Mali"> Mali </option>
                      <option value="Malta"> Malta </option>
                      <option value="Marshall Islands"> Marshall Islands </option>
                      <option value="Martinique"> Martinique </option>
                      <option value="Mauritania"> Mauritania </option>
                      <option value="Mauritius"> Mauritius </option>
                      <option value="Mayotte"> Mayotte </option>
                      <option value="Mexico"> Mexico </option>
                      <option value="Micronesia"> Micronesia </option>
                      <option value="Moldova"> Moldova </option>
                      <option value="Monaco"> Monaco </option>
                      <option value="Mongolia"> Mongolia </option>
                      <option value="Montenegro"> Montenegro </option>
                      <option value="Montserrat"> Montserrat </option>
                      <option value="Morocco"> Morocco </option>
                      <option value="Mozambique"> Mozambique </option>
                      <option value="Myanmar"> Myanmar </option>
                      <option value="Nagorno-Karabakh"> Nagorno-Karabakh </option>
                      <option value="Namibia"> Namibia </option>
                      <option value="Nauru"> Nauru </option>
                      <option value="Nepal"> Nepal </option>
                      <option value="Netherlands"> Netherlands </option>
                      <option value="Netherlands Antilles"> Netherlands Antilles </option>
                      <option value="New Caledonia"> New Caledonia </option>
                      <option value="New Zealand"> New Zealand </option>
                      <option value="Nicaragua"> Nicaragua </option>
                      <option value="Niger"> Niger </option>
                      <option value="Nigeria"> Nigeria </option>
                      <option value="Niue"> Niue </option>
                      <option value="Norfolk Island"> Norfolk Island </option>
                      <option value="Turkish Republic of Northern Cyprus"> Turkish Republic of Northern Cyprus </option>
                      <option value="Northern Mariana"> Northern Mariana </option>
                      <option value="Norway"> Norway </option>
                      <option value="Oman"> Oman </option>
                      <option value="Pakistan"> Pakistan </option>
                      <option value="Palau"> Palau </option>
                      <option value="Palestine"> Palestine </option>
                      <option value="Panama"> Panama </option>
                      <option value="Papua New Guinea"> Papua New Guinea </option>
                      <option value="Paraguay"> Paraguay </option>
                      <option value="Peru"> Peru </option>
                      <option value="Philippines"> Philippines </option>
                      <option value="Pitcairn Islands"> Pitcairn Islands </option>
                      <option value="Poland"> Poland </option>
                      <option value="Portugal"> Portugal </option>
                      <option value="Puerto Rico"> Puerto Rico </option>
                      <option value="Qatar"> Qatar </option>
                      <option value="Republic of the Congo"> Republic of the Congo </option>
                      <option value="Romania"> Romania </option>
                      <option value="Russia"> Russia </option>
                      <option value="Rwanda"> Rwanda </option>
                      <option value="Saint Barthelemy"> Saint Barthelemy </option>
                      <option value="Saint Helena"> Saint Helena </option>
                      <option value="Saint Kitts and Nevis"> Saint Kitts and Nevis </option>
                      <option value="Saint Lucia"> Saint Lucia </option>
                      <option value="Saint Martin"> Saint Martin </option>
                      <option value="Saint Pierre and Miquelon"> Saint Pierre and Miquelon </option>
                      <option value="Saint Vincent and the Grenadines"> Saint Vincent and the Grenadines </option>
                      <option value="Samoa"> Samoa </option>
                      <option value="San Marino"> San Marino </option>
                      <option value="Sao Tome and Principe"> Sao Tome and Principe </option>
                      <option value="Saudi Arabia"> Saudi Arabia </option>
                      <option value="Senegal"> Senegal </option>
                      <option value="Serbia"> Serbia </option>
                      <option value="Seychelles"> Seychelles </option>
                      <option value="Sierra Leone"> Sierra Leone </option>
                      <option value="Singapore"> Singapore </option>
                      <option value="Slovakia"> Slovakia </option>
                      <option value="Slovenia"> Slovenia </option>
                      <option value="Solomon Islands"> Solomon Islands </option>
                      <option value="Somalia"> Somalia </option>
                      <option value="Somaliland"> Somaliland </option>
                      <option value="South Africa"> South Africa </option>
                      <option value="South Ossetia"> South Ossetia </option>
                      <option value="South Sudan"> South Sudan </option>
                      <option value="Spain"> Spain </option>
                      <option value="Sri Lanka"> Sri Lanka </option>
                      <option value="Sudan"> Sudan </option>
                      <option value="Suriname"> Suriname </option>
                      <option value="Svalbard"> Svalbard </option>
                      <option value="eSwatini"> eSwatini </option>
                      <option value="Sweden"> Sweden </option>
                      <option value="Switzerland"> Switzerland </option>
                      <option value="Syria"> Syria </option>
                      <option value="Taiwan"> Taiwan </option>
                      <option value="Tajikistan"> Tajikistan </option>
                      <option value="Tanzania"> Tanzania </option>
                      <option value="Thailand"> Thailand </option>
                      <option value="Timor-Leste"> Timor-Leste </option>
                      <option value="Togo"> Togo </option>
                      <option value="Tokelau"> Tokelau </option>
                      <option value="Tonga"> Tonga </option>
                      <option value="Transnistria Pridnestrovie"> Transnistria Pridnestrovie </option>
                      <option value="Trinidad and Tobago"> Trinidad and Tobago </option>
                      <option value="Tristan da Cunha"> Tristan da Cunha </option>
                      <option value="Tunisia"> Tunisia </option>
                      <option value="Turkey"> Turkey </option>
                      <option value="Turkmenistan"> Turkmenistan </option>
                      <option value="Turks and Caicos Islands"> Turks and Caicos Islands </option>
                      <option value="Tuvalu"> Tuvalu </option>
                      <option value="Uganda"> Uganda </option>
                      <option value="Ukraine"> Ukraine </option>
                      <option value="United Arab Emirates"> United Arab Emirates </option>
                      <option value="United Kingdom"> United Kingdom </option>
                      <option value="Uruguay"> Uruguay </option>
                      <option value="Uzbekistan"> Uzbekistan </option>
                      <option value="Vanuatu"> Vanuatu </option>
                      <option value="Vatican City"> Vatican City </option>
                      <option value="Venezuela"> Venezuela </option>
                      <option value="Vietnam"> Vietnam </option>
                      <option value="British Virgin Islands"> British Virgin Islands </option>
                      <option value="Isle of Man"> Isle of Man </option>
                      <option value="US Virgin Islands"> US Virgin Islands </option>
                      <option value="Wallis and Futuna"> Wallis and Futuna </option>
                      <option value="Western Sahara"> Western Sahara </option>
                      <option value="Yemen"> Yemen </option>
                      <option value="Zambia"> Zambia </option>
                      <option value="Zimbabwe"> Zimbabwe </option>
                      <option value="other"> Other </option>
                    </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="form-select d-block w-100" id="state" >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
        </article>
              
            </div>
            <div className="row justify-content-start mt-4">
            <div className="col">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input"/>
                  I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
                </label>
              </div>

              <button className="btn btn-primary mt-3" type="submit" >Submit</button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  </Wrapper>
    );
};

export default AddUser;