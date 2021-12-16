import React, {useState} from 'react';
import {ServiceCard, ServiceCardEmpty, ServiceModal, WhyFreeTonModal} from '../../../components';
import {Body3Bold, Button, Col, Container, Row, Title2Bold} from '../../../ui';
import {COLORS} from '../../../utils/static';


export const AvailableServicesBoxView = ({services = [], goToService = null}) => {
    const [selectedService, setSelectedService] = useState(null);
    const [showWhatsThisModal, setShowWhatsThisModal] = useState(false);

    const downloadedVCCount = (vcTemplates) => {
        return vcTemplates.filter(item => item.vc).length;
    };

    return (
        <Container>
            <Row justifyContent={'space-between'} alignItems={'center'} marginBottom={31}>
                <Title2Bold color={'#FFFFFF'}>
                    Available Services
                </Title2Bold>

                <Button
                    label={'WHAT IS THIS?'}
                    onClick={() => setShowWhatsThisModal(true)}
                    TextStyle={Body3Bold}
                    width={150}
                    size={'small'}
                    borderRadius={3}
                    borderColor={COLORS.white}
                />
            </Row>

            <Row margin={-8} colsMarginBottom={16}>
                {services.map((item, key) =>
                    <Col auto key={key}>
                        <ServiceCard
                            logo={item.logoUrl}
                            descr={item.description}
                            allVC={item.vcTemplates.length}
                            verifiedVC={downloadedVCCount(item.vcTemplates)}
                            onClick={() => setSelectedService(item)}
                        />
                    </Col>
                )}

                <Col auto>
                    <ServiceCardEmpty/>
                </Col>
            </Row>

            {selectedService && <ServiceModal
                service={selectedService}
                onClose={() => setSelectedService(null)}
                onGetVc={() => goToService(selectedService)}
            />}

            {showWhatsThisModal && <WhyFreeTonModal
                onClose={() => setShowWhatsThisModal(false)}
            />}
        </Container>
    );
};
