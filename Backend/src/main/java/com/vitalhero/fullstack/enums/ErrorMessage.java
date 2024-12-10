package com.vitalhero.fullstack.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorMessage {
    DONOR_NOT_REGISTERED("Doador não registrado"),
    DOCTOR_NOT_REGISTERED("Médico não registrado"),
    BLOODCENTER_NOT_REGISTERED("Hemocentro não registrado"),
    BLOODCENTER_ALREADY_REGISTERED("Hemocentro já cadastrado"),
    BLOODSTOCK_ALREADY_REGISTERED("Estoque sanguíneo já cadastrado"),
    BLOODSTOCK_NOT_FOUND("Estoque sanguíneo não cadastrado"),
    DONATION_FORM_NOT_REGISTERED("Formulário de doação não registrado"),
    DONATION_ALREADY_REGISTERED("Doação já registrado"),
    DONATION_NOT_REGISTERED("Formulário de doação não registrado"),
    REVIEW_NOT_REGISTERED("Review não registrado"),
    SCHEDULING_ALREADY_REGISTERED("Agendamento já registrado"),
    SCHEDULING_NOT_REGISTERED("Agendamento não registrado"),
    SCREENING_NOT_REGISTERED("Triagem não registrado"),
    ID_CANNOT_CHANGED("ID não pode ser alterado"),
    NAME_CANNOT_CHANGED("Nome não pode ser alterado"),    
    CPF_ALREADY_REGISTERED("CPF já registrado"),
    CPF_CANNOT_CHANGED("CPF não pode ser alterado"),
    CRM_ALREADY_REGISTERED("CRM já cadastrado"),
    CRM_CANNOT_CHANGED("CRM não pode ser alterado"),
    EMAIL_ALREADY_REGISTERED("Email já registrado"),
    EMAIL_CANNOT_CHANGED("Email não pode ser alterado"),
    PHONE_NUMBER_ALREADY_REGISTERED("Número de telefone já registrado"),
    PHONE_NUMBER_UNAVAILABLE("Número de telefone indisponível"),
    ADDRESS_ALREADY_REGISTERED("Endereço já cadastrado"),
    ADDRESS_CANNOT_CHANGED("Endereço não pode ser alterado"),
    ADDRESS_NOT_REGISTERED("Endereço não registrado"),
    SCREENING_NOT_COMPLETED("Triagem não preenchida"),
    SCREENING_NOT_VALIDATED("Triagem não validada"),
    UNSCHEDULED_DONOR("Doador não agendado"),
    INVALID_PASSWORD("Senha inválida"),
    EMAIL_NOT_FOUND("Email não encontrado"),
    UNKNOWN_USER("Usuário não conhecido"),
    DONOR_NOT_COMPLETE_DONATION_FORM("Doador não preencheu o formulário de doação"),
    DONOR_COMPLETE_DONATION_FORM("Doador já preencheu o formulário de doação"),
    DONOR_CANNOT_CHANGED("Doador não pode ser alterado"),
    DONOR_NOT_COMPLETE_REVIEW("Doador não realizou sua review"),
    DONOR_COMPLETE_REVIEW("Doador já realizou sua review"),
    DONOR_NOT_COMPLETE_SCREENING("Doador não pode preencheu triagem"),
    BLOODCENTER_CANNOT_CHANGED("Hemocentro não pode ser alterado");

    private final String message;

    @Override
    public String toString() {
        return message;
    }
}
