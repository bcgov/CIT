import { useHistory } from "react-router-dom";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "shared-components";
import { useEffect, useState } from "react";
import v4 from "uuid";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import MapContainer from "../../MapContainer/MapContainer";
import AddressSearchBar from "../../AddressSearchBar/AddressSearchBar";
import { getAddressData } from "../../../helpers/resourceCalls";
import PropertyInfo from "../../PropertyInfo/PropertyInfo";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import {
  getParcelData,
  getPID,
  getParcelDataNoAddress,
} from "../../../helpers/parcelData";
import {
  setAddress,
  setCoords,
  setResourceIds,
  setPID,
  setGeometry,
  setParcelOwner,
  setParcelSize,
  setSiteId,
  resetOpportunity,
} from "../../../store/actions/opportunity";
import Radios from "../../FormComponents/Radios";
import Terms from "../../Terms/Terms";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

export default function AddOpportunity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const editing = useSelector((state) => state.opportunity.editing);
  const address = useSelector((state) => state.opportunity.address);
  const coords = useSelector((state) => state.opportunity.coords);
  const PID = useSelector((state) => state.opportunity.siteInfo.PID.value);
  const geometry = useSelector(
    (state) => state.opportunity.siteInfo.geometry.coordinates
  );
  const siteId = useSelector(
    (state) => state.opportunity.siteInfo.siteId.value
  );
  const parcelSize = useSelector(
    (state) => state.opportunity.siteInfo.parcelSize.value
  );
  const parcelOwner = useSelector(
    (state) => state.opportunity.siteInfo.parcelOwnership.name
  );
  const nearbyResources = useSelector(
    (state) => state.opportunity.nearbyResources
  );
  const municipality = useSelector(
    (state) => state.opportunity.municipality.name
  );

  const [hasApproval, setHasApproval] = useState(false);
  const [warning, setWarning] = useState([]);
  const [error, setError] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [noAddressFlag, setNoAddressFlag] = useState(false);

  // Handle ProximityData call still running and change of page
  const [proximityInProgress, setProximityInProgress] = useState(true);
  const [changePage, setChangePage] = useState(false);
  const [localityName, setLocalityName] = useState("Your Community");

  // Handle Modal if proximity data is still loading
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const closeModalAndContinue = () => {
    handleClose();
    history.push(`/investmentopportunities/site-info`);
  };

  const handleErrorModalContinue = () => {
    if (!error.length && (!!address || !!geometry)) {
      setWarning([]);
      setError([]);
      setChangePage(true);
      if (!proximityInProgress) {
        closeModalAndContinue();
      }
    }
  };

  const onCancelClick = () => {
    dispatch(resetOpportunity());
    history.push("/investmentopportunities/dashboard");
  };

  useEffect(() => {
    // Data is prepared, continue to next page
    if (!error.length && changePage && !proximityInProgress) {
      closeModalAndContinue();
    }
  }, [changePage, proximityInProgress, error]);

  useEffect(() => {
    if (municipality) {
      setLocalityName(municipality);
    }
  }, [municipality]);

  const goToNextPage = () => {
    handleShow();
    setWarning([]);
    setError([]);
    let errors = [];
    let warnings = [];

    if (!address || !geometry) {
      warnings = [
        ...warnings,
        `This opportunity has no ${!address ? "address" : ""}${
          !address && !geometry ? " or " : ""
        }${!geometry ? "parcel" : ""} associated with it.`,
      ];
    }
    if (parcelOwner === "Private" && hasApproval !== "Yes") {
      errors = [...errors, "Please get the approval before listing this site."];
    }
    if (!agreed) {
      errors = [...errors, "Please agree to the Terms of use."];
    }
    setWarning(warnings);
    setError(errors);
    setChangePage(agreed && !error.length && !warning.length);
    if (!proximityInProgress) {
      closeModalAndContinue();
    }
  };

  const handleRadioChange = (name, label, value) => {
    setHasApproval(label);
  };

  const title1 = "Add an Opportunity";
  const title2 = "Confirm Property";
  const text1 =
    'Enter an address or "zoom in" to the map and drop a pin on the land parcel you want to list as an opportunity for investors.';
  const text2 =
    "Please confirm this is the property you want to list as an investment opportunity in your community";

  const setParcelInfoByCoords = async (newCoords) => {
    const parcelData = await getParcelDataNoAddress(newCoords);
    if (parcelData) {
      dispatch(setPID([parcelData.data.features[0].properties.PID]));
      dispatch(
        setParcelOwner(parcelData.data.features[0].properties.OWNER_TYPE)
      );
      dispatch(
        setParcelSize(
          Number(
            // convert sqM to Acres
            (
              parcelData.data.features[0].properties.FEATURE_AREA_SQM *
              0.000247105
            ).toFixed(3)
          )
        )
      );
      dispatch(setGeometry(parcelData.data.features[0].geometry));
    }
  };

  const setParcelData = async (id) => {
    // ensure previous parcel data is cleared, but keeps address, coords intact
    dispatch(setParcelSize(null));
    dispatch(setParcelOwner(null));
    dispatch(setGeometry(null));
    // ensure hasApproval is false
    setHasApproval(false);
    /// //////////////////////////
    const pid = await getPID(id);
    dispatch(setPID(pid));
    if (pid) {
      pid.forEach(async (_pid) => {
        const parcelData = await getParcelData(_pid);
        if (parcelData) {
          dispatch(
            setParcelOwner(parcelData.data.features[0].properties.OWNER_TYPE)
          );
          await dispatch(
            setParcelSize(
              Number(
                // convert sqM to Acres
                (
                  parcelData.data.features[0].properties.FEATURE_AREA_SQM *
                  0.000247105
                ).toFixed(3)
              )
            )
          );
          dispatch(setGeometry(parcelData.data.features[0].geometry));
          if (!geometry) {
            // There is no geometry registered for this PID, try a lng lat query.
            setParcelInfoByCoords(coords);
          }
        } else {
          // There is no Parcel response for this PID, try a lng lat query.
          setParcelInfoByCoords(coords);
        }
      });
    } else {
      // There is no PID for the pacel to be queried, try a lng lat query.
      setParcelInfoByCoords(coords);
    }
  };

  const setParcelDataNoAddress = async (noAddrCoords) => {
    // ensure previous parcel data is cleared
    dispatch(resetOpportunity());
    // reset coords with new coords
    dispatch(setCoords(noAddrCoords));
    // ensure hasApproval is false
    setHasApproval(false);
    if (noAddressFlag) {
      setParcelInfoByCoords(noAddrCoords);
    }
  };

  const getCoords = async (addy) => {
    dispatch(resetOpportunity());
    try {
      const data = await getAddressData(addy);
      dispatch(setAddress(data.data.features[0].properties.fullAddress));
      dispatch(
        setCoords([
          data.data.features[0].geometry.coordinates[1],
          data.data.features[0].geometry.coordinates[0],
        ])
      );
      if (data.data.features[0].properties.siteID) {
        dispatch(setSiteId(data.data.features[0].properties.siteID));
      } else if (data.data.features.length) {
        dispatch(setSiteId(null));
      }
    } catch (err) {
      setError([...error, "Service is not available.  Please try again later"]);
    }
  };

  useEffect(() => {
    if (siteId && !noAddressFlag) {
      setParcelData(siteId);
    }
    if (noAddressFlag) {
      setParcelDataNoAddress(coords);
    }
  }, [siteId, noAddressFlag]);

  const handleError = (message) => {
    setError([...error, message]);
  };

  return (
    <>
      <NavigationHeader currentStep={1} />
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        centered
        backdrop="static"
      >
        {error.length || warning.length ? (
          <>
            <Modal.Header>
              <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {[...error, ...warning].map((e) => (
                <p className="text-red" key={v4()}>
                  {e}
                </p>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button
                label="Cancel"
                styling="bcgov-normal-white mr-auto modal-reset-button btn"
                onClick={handleClose}
              />
              <Button
                label="Continue"
                styling="bcgov-normal-blue modal-save-button btn"
                onClick={handleErrorModalContinue}
              />
            </Modal.Footer>
          </>
        ) : (
          <LoadingScreen />
        )}
      </Modal>
      <Container>
        <Row>
          {!address ? (
            <PageTitleHeader title={title1} text={text1} />
          ) : (
            <PageTitleHeader title={title2} text={text2} />
          )}
        </Row>
        <Row>
          <Col className="mb-3 pt-3 d-flex flex-column justify-content-between">
            <Row className="top">
              <Col>
                <AddressSearchBar
                  setAddress={(addy) => dispatch(setAddress(addy))}
                  setLocalityName={(name) => setLocalityName(name)}
                  getCoords={getCoords}
                  handleError={handleError}
                  currentAddress={address}
                />
                {address && !parcelSize && (
                  <Row>
                    <Col>
                      <PropertyInfo info={address} tag={false} />
                    </Col>
                  </Row>
                )}
                {!address && coords && coords[0] !== 54.1722 && (
                  <Row>
                    <Col>
                      <h3>Lat: {coords[0]}</h3>
                      <h3>Lon: {coords[1]}</h3>
                    </Col>
                  </Row>
                )}
                {parcelSize ? (
                  <Row>
                    <Col>
                      <PropertyInfo info={address} tag={false} />
                      <p className="mb-0 mt-3 pb-0">
                        Ownership: <b>{parcelOwner}</b>
                      </p>
                      <p className="mb-0 pb-0">
                        Parcel Size:{" "}
                        <b>{parcelSize ? parcelSize.toFixed(3) : null} acres</b>
                      </p>
                      <p>
                        PID:{" "}
                        <b>{PID && PID.length > 1 ? PID.join(", ") : PID}</b>
                      </p>
                      {parcelOwner === "Private" && (
                        <>
                          <PropertyInfo info="This land parcel or development opportunity resides on private land." />
                          <PropertyInfo
                            info={`As a representative from ${
                              localityName || "Your Community"
                            }, do you have the approval from the land owner to promote this investment opportunity?`}
                          />
                          <Col>
                            <Radios
                              aria-label="approval to sell"
                              labels={["Yes", "No", "Pending Approval"]}
                              name="approval-to-sell"
                              value={hasApproval || ""}
                              handleRadioChange={handleRadioChange}
                            />
                          </Col>
                          {hasApproval !== "Yes" && (
                            <Row className="mt-2">
                              <Col className="text-red">
                                <p>
                                  You must have the approval of the land owner
                                  to promote this opportunity. Please get the
                                  approval before listing this site.
                                </p>
                              </Col>
                            </Row>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                ) : null}
              </Col>
            </Row>
          </Col>
          <Col className="leaflet-shadow">
            <MapContainer
              nearbyResources={{}}
              coords={coords}
              setResourceIds={(r) => dispatch(setResourceIds(r))}
              setAddress={(a) => dispatch(setAddress(a))}
              setCoords={(c) => dispatch(setCoords(c))}
              setSiteId={(id) => dispatch(setSiteId(id))}
              setNoAddressFlag={setNoAddressFlag}
              setProximityInProgress={setProximityInProgress}
            />
          </Col>
        </Row>
        <Row>
          <Terms agreed={agreed} setAgreed={setAgreed} />
        </Row>
      </Container>
      <ButtonRow onClick={goToNextPage} onCancelClick={onCancelClick} />
    </>
  );
}

AddOpportunity.propTypes = {};
