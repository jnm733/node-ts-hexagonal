
export default interface INotificationDTO {
    id: number,
    id_user: number,
    title: string,
    body: string,
    icon: string,
    image: string,
    url_redirect: string,
    utm_source: string,
    utm_medium: string,
    utm_campaign: string,
    created_at: string,
    updated_at: string
}